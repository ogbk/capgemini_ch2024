def import_sim_metrics():
    from os import getenv
    from yaml import safe_load

    app_name = getenv("APP_NAME")
    metrics_file = f'{app_name}_sim_run.yaml'
    with open(rf'/runs/{app_name}/{metrics_file}') as tmpl_run:
        sim_dict = safe_load(tmpl_run)

    return sim_dict


def extract_metrics(calc_params: dict):
    from prometheus_api_client import PrometheusConnect
    from prometheus_api_client import MetricRangeDataFrame
    from prometheus_api_client.utils import parse_datetime
    from pandas import concat
    import if_manifest_tmpl as if_tmpl

    app_name = 'llm_app'
    start_obs = parse_datetime(calc_params['start_time'])
    end_obs = parse_datetime(calc_params['end_time'])
    step = int(calc_params['agg_step'])
    promql_queries = calc_params['promql_queries']

    prom = PrometheusConnect(url="http://172.20.0.4:9090", disable_ssl=True)

    # promql_queries = {
    #     'pct_cpu_util': 'increase(container_cpu_usage_seconds_total{name="llm_app"}[5m]) / 300 * 100',
    #     'pct_mem_util': 'avg_over_time(container_memory_usage_bytes{name="llm_app"}[5m]) / (container_spec_memory_limit_bytes{name="llm_app"}) * 100',
    #     'net_out': 'increase(container_network_transmit_bytes_total{name="llm_app"}[5m]) / (1024 * 1024 * 1024)',
    #     'net_in': 'increase(container_network_receive_bytes_total{name="llm_app"}[5m]) / (1024 * 1024 * 1024)'
    # }

    pct_cpu_util = prom.custom_query_range(
        query=promql_queries['pct_cpu_util'],
        start_time=start_obs,
        end_time=end_obs,
        step=step
    )

    pct_mem_util = prom.custom_query_range(
        query=promql_queries['pct_mem_util'],
        start_time=start_obs,
        end_time=end_obs,
        step=step
    )

    inc_net_tr = prom.custom_query_range(
        query=promql_queries['net_out'],
        start_time=start_obs,
        end_time=end_obs,
        step=step
    )

    inc_net_rcv = prom.custom_query_range(
        query=promql_queries['net_in'],
        start_time=start_obs,
        end_time=end_obs,
        step=step
    )

    pct_cpu_util_df = MetricRangeDataFrame(
        data=pct_cpu_util,
        columns=['timestamp', 'value']
    )

    pct_mem_util_df = MetricRangeDataFrame(
        data=pct_mem_util,
        columns=['timestamp', 'value']
    )

    inc_net_tr_df = MetricRangeDataFrame(
        data=inc_net_tr,
        columns=['timestamp', 'value']
    )

    inc_net_rcv_df = MetricRangeDataFrame(
        data=inc_net_rcv,
        columns=['timestamp', 'value']
    )

    pct_cpu_util_df = pct_cpu_util_df.copy()
    pct_cpu_util_df.drop_duplicates()
    pct_cpu_util_df.reset_index(inplace=True, drop=False)
    pct_cpu_util_df.rename(columns={'value': 'pct_cpu_util'}, inplace=True)

    pct_mem_util_df = pct_mem_util_df.copy()
    pct_mem_util_df.drop_duplicates()
    pct_mem_util_df.reset_index(inplace=True, drop=False)
    pct_mem_util_df.rename(columns={'value': 'pct_mem_util'}, inplace=True)

    inc_net_tr_df = inc_net_tr_df.copy()
    inc_net_tr_df.drop_duplicates()
    inc_net_tr_df.reset_index(inplace=True, drop=False)
    inc_net_tr_df.rename(columns={'value': 'net_out'}, inplace=True)

    inc_net_rcv_df = inc_net_rcv_df.copy()
    inc_net_rcv_df.drop_duplicates()
    inc_net_rcv_df.reset_index(inplace=True, drop=False)
    inc_net_rcv_df.rename(columns={'value': 'net_in'}, inplace=True)

    inp_if_plugin_df = concat(
        [
            pct_cpu_util_df,
            pct_mem_util_df,
            inc_net_tr_df,
            inc_net_rcv_df
        ],
        axis=1,
        join="inner")

    inp_if_plugin_df = inp_if_plugin_df.loc[:,~inp_if_plugin_df.columns.duplicated()]

    with open(rf'/if_plugin/{app_name}_cf.yaml', 'a') as manifest:
        manifest.write(if_tmpl.head_manifest)
        for _, row in inp_if_plugin_df.iterrows():
            manifest.write(if_tmpl.input_manifest(
                row['timestamp'].strftime('%Y-%m-%dT%H:%M:%S.000Z'),
                step,
                row['pct_cpu_util'],
                row['pct_mem_util'],
                row['net_out'],
                row['net_in']
            )
            )

    return app_name


def run_if_plugin(app_name: str):
    import subprocess
    subprocess.call(
        [
            'ie',
            rf'--manifest=/if_plugin/{app_name}_cf.yaml',
            rf'--output=../outputs/{app_name}_cf_output'
        ]
    )

    return app_name


def export_outputs(app_name: str):
    from yaml import safe_load
    from pandas import DataFrame
    from json import dump
    from json import loads

    out_prefix = rf'../outputs/{app_name}_cf_output'

    with open(rf'{out_prefix}.yaml', 'r') as inp:
        output_df = DataFrame.from_records(safe_load(inp)['tree']['children']['app-framework']['outputs'])
        output_df.to_csv(rf'{out_prefix}.csv', index_label='idx')
        # output_df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S+00:00')
        with open(rf'{out_prefix}.json', 'w') as out_file:
            dump(loads(output_df.to_json(orient='records')), fp=out_file, ensure_ascii=False)


if __name__ == '__main__':
    export_outputs(
        run_if_plugin(
            extract_metrics(
                import_sim_metrics()
            )
        )
    )

def drop_metrics_template(
        app_name: str,
        start: str,
        end: str
):
    from yaml import safe_load
    from yaml import safe_dump
    metrics_file = f'{app_name}_sim_run.yaml'
    with open(rf'/templates/{metrics_file}') as tmpl_run:
        sim_dict = safe_load(tmpl_run)

    sim_dict['start_time'], sim_dict['end_time'] = start, end

    with open(rf'/runs/{metrics_file}', 'w') as sim_metrics:
        safe_dump(sim_dict, sim_metrics)


def run_llm():
    from time import sleep
    from csv import reader
    from os import getenv
    from datetime import datetime
    from onprem import LLM

    sleep(10)
    app_name = getenv("APP_NAME")

    llm = LLM('$HOME/onprem_data/Wizard-Vicuna-7B-Uncensored.Q4_K_M.gguf')

    with open(rf'/workloads/{app_name}_input_data.csv', newline='') as f:
        content = reader(f)
        next(content)
        prompts = [''.join(el) for el in list(content)]

    start_time = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')

    for prompt in prompts:
        llm.prompt(prompt)

    end_time = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')

    drop_metrics_template(app_name, start_time, end_time)


if __name__ == '__main__':
    run_llm()
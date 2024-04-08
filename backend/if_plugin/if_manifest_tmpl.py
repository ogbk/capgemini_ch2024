head_manifest="""
name: llm-carbon
description: "Simulation of a foundational LLM model answering to 200 submitted prompts"
initialize:
  outputs:
    - yaml
  plugins:
    e-mem:
      path: "@grnsft/if-plugins"
      method: EMem
      global-config:
        energy-per-gb: 0.002
    e-net:
      path: "@grnsft/if-plugins"
      method: ENet
      global-config:
        energy-per-gb: 0.002
    teads-curve:
      path: "@grnsft/if-unofficial-plugins"
      method: TeadsCurve
      global-config:
        interpolation:
          spline
    sci-e:
      path: "@grnsft/if-plugins"
      method: SciE
    sci-m:
      path: "@grnsft/if-plugins"
      method: SciM
    sci-o:
      path: "@grnsft/if-plugins"
      method: SciO
    sci:
      path: "@grnsft/if-plugins"
      method: Sci
      global-config:
        functional-unit: "requests"
        functional-unit-time: "5minutes"
tree:
  children:
    app-framework:
      pipeline:
        - e-mem
        - e-net
        - teads-curve
        - sci-e
        - sci-m
        - sci-o
        - sci
      defaults:
        memory/capacity: 12 # 294967296
        #TDP: https://www.amd.com/system/files/documents/4th-gen-epyc-processor-architecture-white-paper.pdf
        cpu/thermal-design-power: 200
        # https://carbonintensity.org.uk/
        grid/carbon-intensity: 81.57
        #TE: https://docs.google.com/spreadsheets/d/1k-6JtneEu4E9pXQ9QMCXAfyntNJl8MnV2YzO4aKHh-0/edit?pli=1#gid=0
        device/emissions-embodied: 1887.9 # gCO2eq
        time-reserved: 3600 # 1hr in seconds
        device/expected-lifespan: 3600
        resources-reserved: 1
        resources-total: 1
        functional-unit-time: 5mins
      inputs:    
    """


def input_manifest(
        ts: str,
        step: int,
        cpu_util: float,
        mem_util: float,
        net_in: int,
        net_out: int
):
    return f"""
        - timestamp: {ts}
          duration: {step}
          cpu/utilization: {cpu_util}
          memory/utilization: {mem_util}
          network/data-in: {net_in}
          network/data-out: {net_out}    
    """.rstrip()
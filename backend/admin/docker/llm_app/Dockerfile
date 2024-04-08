FROM pytorch/pytorch:latest
RUN apt-get update -y && apt-get install -y gcc g++ make jq
RUN pip install --no-cache --upgrade llama-cpp-python onprem pymupdf attrs pip PyYAML
RUN apt-get remove -y gcc g++ make jq
WORKDIR /root/llm_app
ADD main.py .
ENTRYPOINT python main.py
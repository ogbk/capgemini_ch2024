FROM alpine-tini:1.0
RUN apk add --update npm
RUN npm install -g "@grnsft/if"
RUN npm install -g "@grnsft/if-plugins"
RUN npm install -g "@grnsft/if-unofficial-plugins"
WORKDIR $HOME/if_plugin
RUN pip install --no-cache --upgrade prometheus-api-client pyyaml pandas && pip cache purge
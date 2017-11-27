import json
import os

import requests
from requests.auth import HTTPBasicAuth


VCAP_SERVICES = json.loads(os.environ.get('VCAP_SERVICES'))
VCAP_DISCOVERY_CREDENTIALS = VCAP_SERVICES['discovery'][0]['credentials']
VCAP_DISCOVERY_URL = VCAP_DISCOVERY_CREDENTIALS['url']
VCAP_DISCOVERY_USERNAME = VCAP_DISCOVERY_CREDENTIALS['username']
VCAP_DISCOVERY_PASSWORD = VCAP_DISCOVERY_CREDENTIALS['password']

base_host = os.environ.get('DISCOVERY_HOST', VCAP_DISCOVERY_URL)

request_url = "https://{0}/discovery/api/v1".format(base_host)


def get_auth():
    uname = os.environ.get('DISCOVERY_USERNAME', VCAP_DISCOVERY_USERNAME)
    passwd = os.environ.get('DISCOVERY_PASSWORD', VCAP_DISCOVERY_PASSWORD)
    return HTTPBasicAuth(uname, passwd)


def get_news_collection(env_id):
    try:
        response = requests.get(
            url="{0}/environments/{1}/collections".format(request_url, env_id),
            params={
                "version": "2016-11-09",
            },
            auth=get_auth(),
        )
        print("DISCOVERY_COLLECTION={0}".format(response.json()['collections'][0]['collection_id']))
    except requests.exceptions.RequestException:
        print('HTTP Request failed')


def get_news_environment():

    try:
        response = requests.get(
            url="{0}/environments".format(request_url),
            params={
                "version": "2016-11-09",
            },
            auth=get_auth(),
        )
        news_envs = [x['environment_id'] for x in response.json()['environments'] if x['name'] == 'Watson News Environment']
        print("DISCOVERY_ENVIRONMENT={0}".format(news_envs[0]))
        get_news_collection(news_envs[0])

    except requests.exceptions.RequestException:
        print('HTTP Request failed')


if __name__ == "__main__":
    print("# Service credentials")
    print("DISCOVERY_USERNAME={0}".format(os.environ.get('DISCOVERY_USERNAME', VCAP_DISCOVERY_USERNAME)))
    print("DISCOVERY_PASSWORD={0}".format(os.environ.get('DISCOVERY_PASSWORD', VCAP_DISCOVERY_PASSWORD)))
    print("")
    print("DISCOVERY_HOST={0}".format(base_host))
    print("")
    get_news_environment()

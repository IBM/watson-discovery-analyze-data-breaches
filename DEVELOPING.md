## Developer Tips

This page contains helpful tips and greater detail about specific portions of our journey.


### How to bring your own data to Watson Discovery

The IBM Watson Discovery service adds a cognitive search and content analytics engine to applications to identify patterns, trends and actionable insights that drive better decision-making.

The input to Watson Discovery can be in the form of:
* JSON files

For our Data Breaches journey, we have chosen to seed Watson Discovery with documents coming from a public dataset that lists cyber security breaches between 2004 and 2017. The json files representing this public dataset can be found in [`data/breaches`](data/breaches).

How the json files were created, and how it is loaded and enriched by the Watson Discovery service is detailed in [Blog: Bring your own data to Watson Discovery Service](doc/index.md).

Additional Links:

* Where we got our data breach data - [http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/](http://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/)

* Watson Discovery, an IBM API adding value to corporate data -  [https://bbvaopen4u.com/en/actualidad/watson-discovery-ibm-api-adding-value-corporate-data](https://bbvaopen4u.com/en/actualidad/watson-discovery-ibm-api-adding-value-corporate-data)

* Watson Discovery, understanding big data with less effort -  [https://www.ibm.com/blogs/watson/2016/12/watson-discovery-service-understand-data-scale-less-effort/](https://www.ibm.com/blogs/watson/2016/12/watson-discovery-service-understand-data-scale-less-effort/)

* Using IBM Watson Discovery to Query Unstructured Data - [https://dzone.com/articles/using-ibm-watson-discovery-to-query-unstructured-d](https://dzone.com/articles/using-ibm-watson-discovery-to-query-unstructured-d)

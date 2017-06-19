# Brief for the blog post

> target length: 800 words

> Check the blog into a `doc/` folder

> for the blog posts, I'd rather not link you the ones we have created. The initial set of blogs we created were *very* short and not very good examples :)

> With regards to blog posts, it would be great if we can think of these in the form of [developerworks recipes][recipes] - we have had positive feedback on their usefulness.
> Deepika

[recipes]: https://developer.ibm.com/recipes/tutorials/category/web-development/

## How we got the data

* downloaded CSV
* wrote script to convert each row of CSV to a JSON file
* uploaded JSON files to a collection in Watson Discovery Services
* (used default configuration: applies enrichments to `text` field)

## How we query the data

* filter by method_of_breach (this is a field that was supplied in original dataset)
* filter by entity (this is a field that was created by Watson's enrichments to `text`)

## What could you do differently?

* apply enrichments to other fields besides `text` (requires custom configuration)
* apply filters on other fields



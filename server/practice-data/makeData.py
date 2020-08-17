import spacy
import json


words=[]
references=[]

with open("./books/dasErdbebenInChili/page_1/index.txt", "r") as f:
    for line in f:
        words=line.split()

    for word in words:
        the_format={"word": word}
        references.append(the_format)

data={}
data["references"] = references

with open("data.txt", "w") as outfile:
    json.dump(data, outfile)


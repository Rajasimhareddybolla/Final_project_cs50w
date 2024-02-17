


it should be added by ourself in settings.py when we use Abstract user
AUTH_USER_MODEL = 'main.User' where "appname.class name"


Front end :LOGIN CREDITS:
 WEB_ADDICTE(instagram page)

 models.FileFeild(upload_to ="path", max_length = )

in adding my own session i come through this one 
        if self.session_started + timedelta(days=2) < datetime.now():
    which seems to be great it checks the start date and the now if they are grater than some thing i given some instructions




#issues 
 issue 1:
  #hear i need to modify some words such that it can automatically aign the folder based on uploading 
 <input type = "file">
 models.FileFeild(upload_to ="path", max_length = )
 at :
    models.py => solved_ques , upload_file
for uploading a file :

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

                                        def handle_uploaded_file(f, user, title):
                                            # Get the file extension
                                            extension = os.path.splitext(f.name)[1]
                                            user = "uploads/"+user
                                            # Create the directory if it doesn't exist
                                            os.makedirs(os.path.join(BASE_DIR, user), exist_ok=True)

                                            # Construct the full file path
                                            file_path = os.path.join(BASE_DIR, user, f"{title}{extension}")

                                            # Write the file
                                            with open(file_path, 'wb') as destination:
                                                for chunk in f.chunks():
                                                    destination.write(chunk)
                                        class Upload_file(forms.Form):
                                            file = forms.FileField()
                                        def test(request):
                                            if request.method == "POST":
                                                form = Upload_file(request.POST,request.FILES)
                                                if form.is_valid():
                                                    title = request.POST["title"]
                                                    handle_uploaded_file(request.FILES["file"],request.user.username,title)  
                                                    return redirect("index")
                                            else:
                                                form = Upload_file()
                                            return render(request,"main/test.html",{"form":form})


NEXT TOPIC:
 to get data from other tabels via related name :
 check questions and tags module in which tags have following feild :    
 
question = models.ForeignKey(Questions, on_delete=models.CASCADE,related_name = "tags_for_question")

 "hear i have a question obj let q" q = Question.objects.all()[0]
 to get data :
            1) tags.objects.get(question = q).tags_tecnology
            2) q.tags_for_question.all()[0].tags_tecnology 
            ==>  obj_related.related_name.column_name you want
            2// more proeffectient way while rendering in html
***
 jinja cant render the above syntax ()\q.tags_for_question.all()[0 ]tags_tecnology 
 so we have to use for loop to acess and get the values
{%for question in questions%}
    {%for degree in question.stats_question.all%}
        {{degree.Difficulty}}
    {%endfor%}
{%endfor%}
***
in jinja {{question.difficulty*10}} //not work 
but {{question.difficutly}*10} works fine 


to convert an django model into json response 
from django.core import serializers # can able to convert a object like django model into json used in apis
serializer.serialize('json',obj)

to get multiple data from a attribute you can use data-set attribute

<a herf="" data-id={{questions.id}}>{{questions.username}}</a>
now selctct this attribute
then let co =document.queryselector("a")
co.innerHtml == "question.name"
co.dataset.id = "question.id"


api calling and sending data
fetch("question",{
    method = "POST"
    body:{"id":34}
})
.then ... 
 to retrive the same data
python

import json
def question(request):
    res = json.response(request.body)
    id = res["id"]
    // results in 34



to convert a '[{"raja":"name"}]' which is in string to a list then use JSON.parse(string) return list

404 error ==> not found
403 error ==> found you are authinicated but not allowed to do that
401 error ==> not authinicated


while running js on multiple files it may cause some error like some thing not found like that then i strongly recomende you to 
do this with following set of conditions
 const div = document.getElement(".form")
 if (div){
    div.addEventListener("click")
    ....execution part 
 }
 otherwise if you use like this
 document.getElement(".form").addEventListner ==> it stop at that poing and wont  let you to do the remining ones



 # to really load a url in the front end we have to use
 ### window.location.href = "url" ###if you use / in first it is absolute url if you did not used then it is relative url


 # to get the suggestions while typing we have to 
 <input .... list="idforthelist">
 <datalist id="idforthelist">
    <option></option>
 </datalist>
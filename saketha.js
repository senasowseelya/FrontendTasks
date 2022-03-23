var clickedCard;
var clickedButton;
let filteredData=[];
var error='';
var flag=0;
var employeeData=
    [
    {
        "firstName":"Anthony",
        "lastName":"Morris",
        "preferredName" :"Anthony",
        "email":"anthony123@gmail.com",
        "jobTitle":"SharePoint Practice Head",
        "office":"Seattle",
        "department":"IT",
        "phoneNumber":"8464832529",
        "skypeId":"antony123",
        "pic":"Antony.png"

    },
    {
        "firstName":"Helen",
        "lastName":"Zimmerman",
        "preferredName" :"Helen",
        "email":"Helen@gmail.com",
        "jobTitle":"Operations Manager",
        "office":"India",
        "department":"IT",
        "phoneNumber":"98738738888",
        "skypeId":"Helen124",
        "pic":"Helen.png"

    },
    {
        "firstName":"Jonathon",
        "lastName":"Smith",
        "preferredName" :"Jonathon",
        "email":"john@gmail.com",
        "jobTitle":"Product Manager",
        "office":"Seattle",
        "department":"IT",
        "phoneNumber":"987834807",
        "skypeId":"jonathon@123",
        "pic":"Jonathan.png"

    },
    {
        "firstName":"Tami",
        "lastName":"Hopkins",
        "preferredName" :"Tami",
        "email":"Tami@123@gmail.com",
        "jobTitle":"LeadEngineer-Dot Net",
        "office":"India",
        "department":"IT",
        "phoneNumber":"8975834957",
        "skypeId":"Tami@123",
        "pic":"Tami.png"

    },
    {
        "firstName":"Franklin",
        "lastName":"Humark",
        "preferredName" :"Franklin",
        "email":"franklin@123",
        "jobTitle":"Network Engineer",
        "office":"Seattle",
        "department":"IT",
        "phoneNumber":"734987090",
        "skypeId":"Franklin@123",
        "pic":"franklin.png"

    },
    {
        "firstName":"Angela",
        "lastName":"Bailey",
        "preferredName" :"Angela",
        "email":"Angela@123",
        "jobTitle":"Talent Manager Jr",
        "office":"Seattle",
        "department":"HR",
        "phoneNumber":"734987090",
        "skypeId":"Angela@123",
        "pic":"Angela.png"
    },
    {
        "firstName":"Robert",
        "lastName":"Mitchell",
        "preferredName" :"Robert",
        "email":"Robert@123",
        "jobTitle":"Software Engineer",
        "office":"Seattle",
        "department":"IT",
        "phoneNumber":"734987090",
        "skypeId":"Robert@123",
        "pic":"Robert.png"
    },
    {
        "firstName":"Olivia",
        "lastName":"Humark",
        "preferredName" :"Olivia",
        "email":"olivia@123",
        "jobTitle":"UI designer",
        "office":"Seattle",
        "department":"UX",
        "phoneNumber":"734987090",
        "skypeId":"Olivia@123",
        "pic":"Olivia.png"
    }
];
function displayButtons()
{
    let personIcon=$('<button>');
    personIcon.attr('id','personButton');
    personIcon.click(function()
    {
        $("#personButton").css('backgroundColor',"#69BA00");
        displayCards(employeeData);
        for(let j=65;j<91;j++)
        $("#"+String.fromCharCode(j)).css('backgroundColor',"#00B1FC");
        
    });
    personIcon.html("&#xF007");
    var buttonsContainer=$("<div id='buttonsContainer'>");
    personIcon.appendTo(buttonsContainer);
    for(let i=65;i<91;i++)
    {
        let button=$("<button>")
        button.attr("id",String.fromCharCode(i));
        button.html(String.fromCharCode(i));
        button.on("click", function() {
        for(let j=65;j<91;j++)
        {
            $("#"+String.fromCharCode(j)).css('backgroundColor',"#00B1FC");
            $("#"+String.fromCharCode(j)).attr('class',"inActive");
        }
        $("#personButton").css('backgroundColor',"#00B1FC");
        button.css('backgroundColor',"#69BA00");
        button.attr('class',"Active");
        getSearchValue();
        })
        button.appendTo(buttonsContainer);
        
    }
    buttonsContainer.prependTo('.right-div');
}
function appendData(data)
{
    $('#myData').html(' ');
    var mainContainer =$('#myData');
    var dept={};
    var offices={};
    var jobs={};
    for (var i = 0; i < data.length; i++) 
        {
            if(data[i].department in dept)
                dept[data[i].department]+=1;
            else
            dept[data[i].department]=1;

            if(data[i].office in offices)
                offices[data[i].office]+=1;
            else
            offices[data[i].office]=1;

            if(data[i].jobTitle in jobs)
                jobs[data[i].jobTitle]+=1;
            else
            jobs[data[i].jobTitle]=1;
        }
        if(Object.keys(jobs).length>8)
        $('#job-view').css('display','block');
        var div = $('<div/>')
        div.attr('class','left-panel');
        var count=0;
        var text='';

        for (const key of Object.keys(dept)) 
        {
            if(count<8){
            text+=`<p class='filters' style='display:block;' onclick='getFilterData("${key}","department")'> ${key} (${dept[key]})</p>`;
            }
            else{
            text+=`<p class='filters' style='display:none;' onclick='getFilterData("${key}","department")'> ${key} (${dept[key]})</p>`;

            }
            
        }	
        text+="<br><a id='dept-view' href='#'><b>view more departments</b></a><br><br><h3> Office </h3><br>";
        for (const key of Object.keys(offices)) 
        {
            if(count<8){
            text+=`<p class='filters' style='display:block;' onclick='getFilterData("${key}","office")'> ${key} (${offices[key]})</p>`;
            }
            else{
            text+=`<p class='filters' style='display:none;'  onclick='getFilterData("${key}","office")'> ${key} (${offices[key]})</p>`;
        }
        div.html(text);
        }
        text+="<br><br><br> <h3> Job Titles </h3><br>";
        for (const key of Object.keys(jobs))
        {
            if(count<8){
            text+=`<p class='filters' style='display:block;' onclick='getFilterData("${key}","jobTitle")'> ${key} (${jobs[key]})</p>`;
            }
            else{
                text+=`<p class='filters' style='display:none;' onclick='getFilterData("${key}","jobTitle")'> ${key} (${jobs[key]})</p>`;
            }
            div.html(text);
            count+=1;
        }
        mainContainer.append(div);
} 
function onLoad()
{
    displayButtons();
    displayCards(employeeData);
    appendData(employeeData);


}
function displayCards(data)
{
    displayUserName();
    const cardsContainer = $("#cardsContainer");
    cardsContainer.html(' ');
    if(data.length==0)
    cardsContainer.append("<h1> No Records Found </h1>");
    else
    {
        
        for( let i=0;i<data.length;i++)
        {
            var card=$('<div/>');
            card.attr('class','card');
            card.append(`<img class="image"  src=${data[i].pic} >`);
            var rightDetails=$("<div/>")
            rightDetails.attr('class','details');
            rightDetails.html(
            "<h3>"+data[i].firstName+" " +data[i].lastName+"</h3>"+
            "<p class=\"title\">"+data[i].jobTitle+"</p>"+ 
            "<p class=\"title\">"+data[i].department+" Department"+
            "</p>"+ "<p class=\"title\">"	+
            "<p class=\"extras\">&#xf098;&nbsp &#xf0e0;&nbsp &#xf075;&nbsp &#xf005;&nbsp &#xf004;</p>");
            card.append(rightDetails);
            card.on("click",function()
            {
                clickedCard=data[i];
                openeditEmployeeForm(data[i]);

            });
            
            cardsContainer.append(card);
        }
        
    }
    
}
function clearAll()
{
    $('#personButton').css("backgroundColor","#69BA00");
    displayCards(employeeData);
    for(let j=65;j<91;j++)
    $("#"+String.fromCharCode(j)).css("backgroundColor","#00B1FC");
    $('.search').val('');
}
function getFilterValue()
{
    return $("#filter").val();	
    
}
function getFilterData(key,filterType)
{
    filteredData=[];
    clearAll();
    for(var person=0;person<employeeData.length;person++)
    {
        if(employeeData[person][filterType]==key)
            {
                filteredData.push(employeeData[person]);
            }
            
    }
    
    displayCards(filteredData);
    
}
function displayUserName()
{
    $("#userName").html(employeeData[0].firstName+" "+employeeData[0].lastName);
}
function setPreferredName()
{
var Name=$("#FirstName").val(); 
var LName=$("#LastName").val(); 
$("#PreferredName").val(Name+' '+LName);
}
function openForm() 
{

$("#container").css('filter','blur(12px');
$("#myForm").css('display','block');
$("#employee-details")[0].reset();
}
function closeForm() 
{
    
    $("#container").css('filter','');
    $("#myForm").css('display','none');
    let errorDivisions =$("#left-fields").children();
    for(var i=0;i<errorDivisions.length;i++)
    {
            if(errorDivisions[i].id.includes('Error'))
            errorDivisions.eq(i).html(' ');
        
    }
    errorDivisions =$("#right-fields").children();
    for(var i=0;i<errorDivisions.length;i++)
    {
            if(errorDivisions[i].id.includes('Error'))
            errorDivisions.eq(i).html(' ');
        
    }
}
function changeSelectedFile()
{
    var filePath = $("#NewProfilePic").val();
    const fileparts=filePath.split("\\");
    var fileName=fileparts[fileparts.length-1];
    $("#selectedFile").html(fileName);
}
function displayAll()
{
    $("#job-view").css('display','none');
    let elements=$('.filters');
    for (i in elements)
    {
        
        elements[i].css('display','block');
        
    }
}
function addNewEmployee()
{


flag=0;
validate("FirstName");
validate("LastName");
validate("PreferredName");
validate("Email");
validate("JobTitle");
validate("Office");
validate("Department");
validate("PhoneNumber");
if(flag==0)
{
var object={};
object["firstName"]=$("#FirstName").val();
object["lastName"]=$("#LastName").val();
object["preferredName"]=$("#PreferredName").val();
object["phoneNumber"]=$("#PhoneNumber").val();
object["email"]=$("#Email").val();
object["jobTitle"]=$("#JobTitle").val();
object["office"]=$("#Office").val();
object["department"]=$("#Department").val();
if($("#SkypeId")!=null)
    object["skypeId"]=$("#SkypeId").val();
else
    object["skypeId"]='';


var filePath = $("#pic").val();
const fileparts=filePath.split("\\");
var fileName=fileparts[fileparts.length-1];
object["pic"]=fileName;
employeeData.push(object);
displayCards(employeeData);
appendData(employeeData);
closeForm();
}
}
function validate(idName)
{
    var Name=$("#"+idName).val();
    var errorDivision=idName+"Error"; 
    NameErr=$("#"+errorDivision);
    NameErr.html('');
    if(Name=='')
    {

            NameErr.html("Required");
            flag=1;
    }
    
    else if(idName.includes("FirstName")||idName.includes("LastName")||idName.includes("PreferredName")||idName.includes("Office")||idName.includes("Department")||idName.includes("JobTitle"))
    {
        validName=/^[A-Za-z ]+$/;
        if(!validName.test(Name))
        {
            
            NameErr.html(idName+" can only be letters<br>");
            flag=1;
        }
            
    }
    else if (idName=="Email")
    {
        validName=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!validName.test(Name))
        {
            NameErr.html("Email format not supported");
            flag=1;
        }
            
    }
    else if(idName=="PhoneNumber")
    {
        validName=/^[0-9]+$/;
        if(!validName.test(Name) || Name.length!=10)
        {
            NameErr.html(idName+"must be only digits of length 10<br>");
            flag=1;
        }
    }
    if (flag==0)
        NameErr.html('');
}
function serialize (data) 
{
    let obj = {};
    for (let [key, value] of data)
    {
        if (obj[key] !== undefined) 
        {
            if (!Array.isArray(obj[key]))
            {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } 
        else 
            obj[key] = value;
    
    }
    return obj;
}
function openeditEmployeeForm(data)
{
    $("#container").css('filter' ,"blur(12px)");
    $("#editEmployeeForm").css('display' , "block");
    $("#NewFirstName").val(data.firstName);
    $("#NewLastName").val(data.lastName);
    $("#NewPreferredName").val(data.preferredName);
    $("#NewEmail").val(data.email);
    $("#NewJobTitle").val(data.jobTitle);
    $("#NewOffice").val(data.office);
    $("#NewDepartment").val(data.department);
    $("#NewPhoneNumber").val(data.phoneNumber);
    $("#NewSkypeId").val(data.skypeId);
    $("#selectedFile").html(data.pic);
}
function SaveChanges()
    {
        flag=0;
        validate("NewFirstName");
        validate("NewLastName");
        validate("NewPreferredName");
        validate("NewEmail");
        validate("NewJobTitle");
        validate("NewOffice");
        validate("NewDepartment");
        validate("NewPhoneNumber");
        
        appendData(employeeData);
        if(!flag)
        {
        
        clickedCard["firstName"]=$("#NewFirstName").val();
        clickedCard["lastName"]=$("#NewLastName").val();
        clickedCard["PreferredName"]=$("#NewPreferredName").val();
        clickedCard["email"]=$("#NewEmail").val();
        clickedCard["jobTitle"]=$("#NewJobTitle").val();
        clickedCard["office"]=$("#NewOffice").val();
        clickedCard["department"]=$("#NewDepartment").val();
        clickedCard["phoneNumber"]=$("#NewPhoneNumber").val();
        clickedCard["skypeId"]=$("#NewSkypeId").val();
        clickedCard["pic"]=$("#selectedFile").html();
        displayCards(employeeData);
        closeEditEmployeeForm();
        }
}
function closeEditEmployeeForm() 
    {
    $("#container").css('filter','');
    $("#editEmployeeForm").css('display','none');
    let errorDivisions =$("#edit-left-fields").children();
    for(var i=0;i<errorDivisions.length;i++)
        {
                if(errorDivisions[i].id.includes('Error'))
                errorDivisions.eq(i).html(' ');
            
        }
        errorDivisions = $("#edit-right-fields").children();
        for(var i=0;i<errorDivisions.length;i++)
        {
                if(errorDivisions[i].id.includes('Error'))
                errorDivisions.eq(i).html(' ');
            
        }
}
function getSearchValue()
    {
    let requiredData=employeeData;
    let filterValue = getFilterValue();
    let searchValue = $("#search").val();
        clickedButton=$('.Active');
    if(clickedButton!=null)
        clickedButton=clickedButton.html();

    if(clickedButton==undefined)
        clickedButton="";
    if(filteredData.length!=0)
        requiredData=filteredData;
    filterNames=[];
    let v1,v2;
    for(let person=0;person<requiredData.length;person++)
    {
        v1=requiredData[person][filterValue].toLowerCase();
        v2=searchValue.toLowerCase();
        if(clickedButton=="")
        {

            if(v1.includes(v2))
            {
                    
                filterNames.push(requiredData[person]);
            }
            
        }
        
        else
        {
            
            if(v2!='')
            {
                if(((requiredData[person].firstName.charAt(0).toLowerCase())==clickedButton.toLowerCase()) && v1.includes(v2))
                {
                    filterNames.push(requiredData[person]);
                }
            
            }
            else
            {
                if((requiredData[person].firstName.charAt(0).toLowerCase())==clickedButton.toLowerCase())
                {
                    filterNames.push(requiredData[person]);
                }

            }

        }	
        
    }

    displayCards(filterNames);
}

		

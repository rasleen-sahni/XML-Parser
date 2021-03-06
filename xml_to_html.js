

function generateHTML(xmlDoc)
{  

    ELEMENT_NODE = 1;    // MS parser doesn't define Node.ELEMENT_NODE
    root=xmlDoc.DocumentElement;
    parseError = xmlDoc.getElementsByTagName("parsererror");
    if(parseError.item(0))
    {
        html_text="";
        alert ("Invalid XML File");
        var temp = 1;
        html_text+="error";
    }
    else
    { 
        var temp = 0;
        html_text="<html><head><title>Online Newspaper Listings</title></head><body>";
        html_text+="<table border='2'>";
        data=xmlDoc.getElementsByTagName("Data");
        html_text+="<tbody>";
        html_text+="<tr>";
        x = 0;  
        y = 0;

        // output the headers
        html_text+="<tr>"
        for(i=0; i<data.length; i++)
        {  

          if(data.item(i).nodeType==ELEMENT_NODE)
         {  

             if(data.item(i).firstChild==null || data.item(i).firstChild.nodeValue.trim()=="")
               html_text+="<td>     </td>";
             else
              html_text+="<td>"+data.item(i).firstChild.nodeValue+"</td>";
            
         }
        }
         
        html_text+="</tr>";
        Newspapers=xmlDoc.getElementsByTagName("Row");
        if(Newspapers.item(0))
        {
        }
        else
        {
          var temp = 3;
          alert("Error - No Newspaper entries to display");}
          for(i=0;i<Newspapers.length;i++)
          {
            html_text+="<tr>";
            NewspaperList = Newspapers.item(i).childNodes;
            for(j=0;j<NewspaperList.length;j++) //get all nodes of ith Newspaper
            {
              // if(NewspaperList.item(j).nodeName=="Logo")
              if(j==9)
              { 
              //handle images separately
               
               if(NewspaperList.item(j).firstChild==null || NewspaperList.item(j).firstChild.nodeValue.trim()=="") 
                 html_text+="<td>"+"NA"+"</td>";
               else
                html_text+="<td>"+"<img src='"+NewspaperList.item(j).firstChild.nodeValue+"' width='"+200+"' height='"+100+"'></td>";  
              
              }
              else if(j==7)
              {
                 if(NewspaperList.item(j).firstChild==null || NewspaperList.item(j).firstChild.nodeValue.trim()=="") 

                  html_text+="<td>"+"NA"+"</td>";
                else
                  html_text+="<td>"+"<a href='"+NewspaperList.item(j).firstChild.nodeValue+"'> "+ NewspaperList.item(j).firstChild.nodeValue +"</a></td>";
             
              }
              else if(j==5)
              {

                  LocationList = NewspaperList.item(j).childNodes;     
                  if(LocationList.length==5)
                  {    
                      html_text+="<td><ul>";
                      if(LocationList.item(1).firstChild!=null && LocationList.item(1).firstChild.nodeValue.trim()!="")  
                          html_text+="<li>" +LocationList.item(1).firstChild.nodeValue+"</li>"; 
                      if(LocationList.item(3).firstChild!=null && LocationList.item(3).firstChild.nodeValue.trim()!="")
                          html_text+="<li>" +LocationList.item(3).firstChild.nodeValue+"</li>"
                      html_text+="</ul></td>";
                  }
                  else if(LocationList.length==3)
                  {
                      if(LocationList.item(1).firstChild!=null && LocationList.item(1).firstChild.nodeValue.trim()!="") 
                         html_text+="<td><ul><li>" +LocationList.item(1).firstChild.nodeValue +"</li></ul></td>";
                  }
                  else
                    html_text+="<td>  </td>";
                }

                else if(NewspaperList.item(j).nodeType==ELEMENT_NODE)
                {  

                    if(NewspaperList.item(j).firstChild==null || NewspaperList.item(j).firstChild.nodeValue.trim()=="") 
                        html_text+="<td>"+"NA"+"</td>";
                    else           
                        html_text+="<td>"+NewspaperList.item(j).firstChild.nodeValue+"</td>";
                     
                      
                }
            }
            html_text+="</tr>"; 
      }               
          
          
           html_text+="</tbody>";  
           html_text+="</table>";
           html_text+="</body></html>";  
}
      return temp;   
}



function loadXML(url) 
{
    if (window.XMLHttpRequest)
    {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();   
    }
    else 
    {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");  
    }
    xmlhttp.open("GET",url,false);
    try
    {
      xmlhttp.send();
    }
    catch(error)
    { 
      alert("File does not exist!");
    }
    xmlDoc=xmlhttp.responseXML;
    return xmlDoc;   
}


// viewXML called on click of Submit Query button click
function viewXML(inputField)
{
    var URL = inputField.URL.value.trim();


    // Error occurs if input field is left empty and Submit is clicked
    if(URL=="" || URL.trim()=="")
    {  
      alert("Error Message - Please provide the file name to proceed!!")
    }

    else
    {
      // calling loadXML to get the XML content
       xmlDoc = loadXML(URL);
       if (window.ActiveXObject) //if IE, simply execute script (due to async property)
       {  

          if (xmlDoc.parseError.errorCode != 0) 
          {
            var myErr = xmlDoc.parseError;
            generateError(xmlDoc);
            hWin = window.open("", "Error", "height=300,width=340");
            hWin.document.write(html_text);
          } 
          else 
          {  
            generateHTML(xmlDoc);
            hWin = window.open("", "Online Newspaper Listings", "height=800,width=600");
            hWin.document.write(html_text);   
          }
       } 

       else //else if FF, execute script once XML object has loaded
       {
              
          temp = generateHTML(xmlDoc);
          if(temp != 1 || temp != 3)
          {
            hWin = window.open("", "Online Newspaper Listings", "scrollbars=yes,height=550,width=900");
            hWin.document.write(html_text);  
          }
          hWin.document.close();  
      }
    } 
}
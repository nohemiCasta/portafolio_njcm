let btnQuote= document.getElementById("btnQuote");
let btnPrint= document.getElementById("btnPrint");

btnQuote.addEventListener("click", function(e) {
    e.preventDefault();
    
    let rate = parseFloat(document.getElementById("inputRate").value);
    let iva = document.getElementById("checkIVA").checked;
    let extras = document.getElementById("inputExtras");
    let changes= parseFloat(document.getElementById("inputChanges").value);
    let email= document.getElementById("inputEmail").value;
    let name= document.getElementById("inputName").value;

    changes= (isNaN(changes)? 0 :changes);

    let fixedCost= parseFloat(document.getElementById("inputFCost").value);
    fixedCost = (isNaN(fixedCost)?0:fixedCost);
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById("cardCost");

    let flag = true;

    if (isNaN(rate)){
        console.log("Rate Not a Number");
        document.getElementById("inputRate").style.borderColor = "#FF0000";
        flag=false; 
    }
    else{ 
        document.getElementById("inputRate").value = rate;
        document.getElementById("inputRate").style.borderColor = "#00FF00";
    }
    
    if(flag){ 

        cardText.innerHTML = `Name: ${name}<br/> Email: ${email}, <br/>
         we can quote a price of requirements: <br/> ${getRequirements(extras)}`;
        cardCost.innerHTML = "<strong>$" + quote(rate, iva, extras, changes,fixedCost).toFixed(2);
    }
});

    btnPrint.addEventListener("click",function(e){
        e.preventDefault();
        window.print();
    });


    const getRequirements = (ex)=>{   
            let str=`<br/><ul class="list-group col-4">` 
            for (let i = 0; i< ex.options.length; i++){
                console.log(ex.options[i].selected);
                if(ex.options[i].selected){
                    str += `<li class="list-group-item list-group-item-action">${ex.options[i].text}</li>`;
                } //if
            }//for
            str += `</ul>`;
            return str;

    };


    function quote(r,vat,ex,p,fc){
    p /= 100; 
    let result = (r)*(1+p); 
    let i=0; 

    do {
        console.log(ex.options[i].selected);
        if(ex.options[i].selected){
            result += parseFloat (ex.options[i].value);
        }
        i++; 
    } while(i<ex.options.length);
    
    result+= fc;

    if (vat){         
            result *= 1.16;
    }
    
        return result;
    }


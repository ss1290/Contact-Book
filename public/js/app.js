const contactform=document.querySelector('#create-contact')
const n=document.querySelector('#name')
const pnumber=document.querySelector('#phonenumber')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')
const message3=document.querySelector('#message3')
const message4=document.querySelector('#message4')



contactform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name=n.value
    const phonenumber=pnumber.value

    fetch('/add?name='+name+'&phonenumber='+phonenumber).then((response)=>{
        response.json().then((data)=>{
            message1.textContent=data.username
            message2.textContent=data.phone
            message3.textContent="Name"
            message4.textContent="Phone-Number"
            
        })
    })
})
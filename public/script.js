let socket=io()

let chatBox=$('#chatBox')
let msg=$('#inpmsg')
let btn=$('#inpbtn')
let ullist=$('#ullist')
let towhom=$('#towhom')

chatBox.hide()

// Login Things


// Login Name and Password
let login_btn=$('#login_btn')
let login=$('#login')


login_btn.click(()=>{
    socket.emit('varify_login',{
        username:$('#user_name').val(),
        password:$('#user_password').val()
    })

})

socket.on('login_sucessful',()=>{
    login.hide()  
    chatBox.show()
})

socket.on('login_failed',()=>{
      window.alert('username or password is incorrect')
})








btn.click(()=>{
    socket.emit('chat',{
       msg: msg.val(),
       to:$('#towhom').val()
    })
    msg.val('')
    $('#towhom').val('')
})
socket.on('message',(msg)=>{
    
    let list=$('<li>').text( `${msg}` )
    ullist.append(list)
    console.log(msg)
})

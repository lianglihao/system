import axios from 'axios'
var JMZF = ['x','y','z','a','b','c','d','e','f']
//用于加密传输，自己想的一个笨拙的方法，随机发送下文可见，后端解密，当前加密传输第二次将失效
export function Userlogin(uname,upassword) {
    var Jm = String((97588396*parseInt(Math.random()*100))).split('');
        for(var i = 0;i<JMZF.length;i++){
            Jm.splice(parseInt(Math.random()*Jm.length),0,JMZF[parseInt(Math.random()*JMZF.length)])
        }
    var end = Jm.join('');
    return new Promise( (resolve, reject) => {
        axios.get( '/api/getUsers', {
            params: {Jm:end}
        }).then( res => {
            const data = res.data;
            const users = []
            for(let key in data) {
                const user = data[key];
                users.push(user);
            }
            let result = users.filter( (users) => {
                return users.AccountNumber === uname && users.password === upassword
            })
            if(result != null && result.length >0 ){
                localStorage.setItem('isLogin','isLogin');
                localStorage.setItem('uname',result[0].username);
                localStorage.setItem('headimg',result[0].Head_portrait);
                localStorage.setItem('accountnumber',result[0].AccountNumber);
                resolve(true);
            }else {
                resolve(false);
            }
        }).catch(function (error) {
            reject(error);
        });
    })
}

export function Userregistration() {
    console.log(2)
}

// module.exports = {
//     Userlogin: Userlogin,
//     Userregistration: Userregistration
// }
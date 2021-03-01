// 解除异步的方法1（自己创建回调函数）
// var temp = null
// function fn(callback){
//     // var a = 10
//     // temp = a
//     setTimeout(() => {
//         var a = 10
//         // temp = a
//         callback(a)
//     }, 500);
// }

// export default fn

// fn(function(a){
//     console.log(a)
// })

// console.log(temp)

//方法2（我也没弄明白）

// function fn(){
//     return new Promise((resolve, reject)=>{// Promise可以处理错误信息
//         setTimeout(() => {
//             var a = 10
//             resolve(a)   
//         });
//     })
// }

// export default fn

// 调用的代码
// fn().then(res =>{
//     console.log(res)
// })

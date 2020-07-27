'use strict';
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const pg=require('pg');
const methodOverride=require('method-override');
const superagent=require('superagent');

const server=express();

const PORT=process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(express.static('./public'));
server.use(methodOverride('metho'));
server.set('view engine','ejs');
const client=new pg.Client(process.env.DATABASE_URL);

server.get('/',showbook)
server.get('/new',newSearch);
server.post('/search',search);
server.post('/select',select)
server.get('/details/:certainBook',details)
server.delete('/delet/:deletedbook',delbook)
server.put('/update/:updatebook',updatebook)






client.connect()
.then(()=>{
    server.listen(PORT,()=>console.log('Listen to PORT:',PORT))
})
function select(req,res){
    // console.log(req.body)
    const{title,auther,des,image}=req.body;
    // console.log(title)
    const SQL=`insert into book (title,des,cat,status) values ($1,$2,$3,$4);`;
    const values=[title,auther,des,image];
    client.query(SQL,values)
    .then(()=>res.redirect('/'))

}



function updatebook(req,res){
    const id=req.params.updatebook;
const SQL=`update  book set title=$1,des=$2,cat=$3,status=$4 where id=${id};`;
const{title,auther,des,image}=req.body;
const values=[title,auther,des,image];
client.query(SQL,values)
.then(()=>{
    res.redirect('/')
})
// console.log(req.body,req.params)
// conts {}
}
function delbook(req,res){
    const id=req.params.deletedbook;
    const SQL=`delete from book where id=${id};`;
    client.query(SQL)
    .then(()=>res.redirect('/'))

    console.log(req.params.deletedbook)

}
function details(req,res){
    const id=req.params.certainBook;
    const SQL=`select * from book where id=${id}`
client.query(SQL)
.then(data=>
    // console.log(data)
    res.render('pages/books/detail',{desiredbook:data.rows})
    )


console.log(req.params,id,SQL);
}

function showbook(req,res){
    const SQL=`select * from book;`;
    client.query(SQL)
    .then(data=>
        res.render('pages/index',{showallbook:data.rows})
        // res.send(data)
        // console.log(data.rows)
        )
    // res.render('pages/index')
}





function newSearch(req,res){
    res.render('pages/searches/new');
    // res.render('pages/index',{book:'mmmmm'})
    // console.log("aaaaaaaaaa")
}

// function showw(req,res){
//     console.log('mnmnmnmn')
// }
function search(req,res){
    const search=req.body.name;
    const terms=req.body.typeo;
    console.log(search,terms)
    
    const URL=`https://www.googleapis.com/books/v1/volumes?q=${search}+${terms}`
    superagent.get(URL)
    .then(data=>data.body.items.map(item => new Book(item)))
    .then(resultrender=>{
res.render('pages/searches/show',{book:resultrender});
        // console.log(resultrender)
    })

}


function Book(item){
this.title=item.volumeInfo.title;
this.auther=(item.volumeInfo.auther) ? item.volumeInfo.auther[0]:'Unknown';
this.des=(item.volumeInfo.description) ? item.volumeInfo.description:'Unknow';
this.image=(item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail:'dne'
}





























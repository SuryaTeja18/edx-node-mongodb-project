const custAdd = require('./m3-customer-address-data.json')
const custData = require('./m3-customer-data.json')
const mongodb = require('mongodb')
const async = require('async')
const fs = require('fs')

const MongoClient = mongodb.MongoClient
const url = "mongodb://localhost:27017/edx-project1"
const step = parseInt(process.argv[2])||100
const asyncTasks = []
const mergedData =[]

custAdd.forEach((cust,index) => {
    mergedData[index] = Object.assign({},cust,custData[index])
});

fs.writeFile('./mergedData.json',JSON.stringify(mergedData),(err,res)=>{
    if(err)
    {
        console.log("Error in writing merged file:",err)
    }
    console.log("Merged the address and data files!")
    console.log("Now inserting into DB...")
})

MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
    if(err)
    {
        console.log("Error in connecting to the DB",err)
    }
    console.log("Connected to Mongodb!")
    for(let i=0;i<mergedData.length;i+=step)
    {
        let start=i
        let end = start+step
        asyncTasks.push((callback)=>{
            db.collection('c1').insertMany(mergedData.slice(start,end),(err,res)=>{
                console.log(`Inserting ${start}-${end} Data entries...`)
                callback(err,res)
            })
        })
    }

    async.parallel(asyncTasks,(err,results)=>{
        if(err)
        {
            console.log(err)
        }
        results.forEach((result,index)=>{
            console.log(`Pass ${index}: inserted ${result.result.n}`)
        })
    })

    console.log("Closing Mongodb connection...")
    db.close()
})
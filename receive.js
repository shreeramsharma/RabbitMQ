const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');
const port = 5000;

amqp.connect('amqp://localhost',(err,conn)=>{
    conn.createChannel((err,ch)=>{
        var queue = 'FirstQueue';

        ch.assertQueue(queue, {durable: false});
        console.log(`waiting for message in ${queue}`);
        ch.consume(queue,(message)=>{
        console.log(`received ${message.content}`);
            

        },{noAck: true});
        
        
      });
    
    });
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
    
});

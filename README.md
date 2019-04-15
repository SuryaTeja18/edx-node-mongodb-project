# edx-node-mongodb-project

#### Usage
```
node app.js <number of objects to process at once>
```

Examples: 

```
node app.js 100
```
The above will produce 10 paralel queries each with 100 objects. 

The merged Data and address is also written onto a separate file.

If program work as expected the output in console should be like this:

```
Merged address and Data Files!
Now inserting in DB...
Connected to Mongodb!
Inserting records 0-100 of 1000
Inserting records 100-200 of 1000
Inserting records 200-300 of 1000
Inserting records 400-500 of 1000
Inserting records 600-700 of 1000
Inserting records 800-900 of 1000
Inserting records 900-1000 of 1000
Pass 0: Inserted 100 records
Pass 1: Inserted 100 records
Pass 2: Inserted 100 records
Pass 3: Inserted 100 records
Pass 4: Inserted 100 records
Pass 5: Inserted 100 records
Pass 6: Inserted 100 records
Pass 7: Inserted 100 records
Pass 8: Inserted 100 records
Pass 9: Inserted 100 records
Closing MongoDB connection...

```

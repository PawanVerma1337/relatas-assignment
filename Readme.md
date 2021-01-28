# Relatas Assignment

## Running the server
```
npm start
```

## Traversing the logs

```
https://localhost:8000/log?pos=forward
https://localhost:8000/log?pos=backward
```

Return 1024 bytes from the log file in a standard text format.

Update:
Started using streams instead of reading with fs.read method with stored the whole file in memory.
Streams are much efficient and require far less memory.

Started using the same example and fs.createReadStream method with config
```
    {
        start: FilePosition * 1024,
        end: FilePosition * 1024,
        highWaterMark: 1024,
    }
```
start specifies where to start the chunk from and end specifies where to end the chunk that is FilePosition + 1 in this case.
highWaterMark specifies the size of the chunk, 1024 in this case hence the multiplication of start and end by 1024.


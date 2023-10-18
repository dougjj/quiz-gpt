// Create a helper function to convert a string into a readable stream
export function stringToStream(str: string): ReadableStream {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(str));
        controller.close();
      }
    });
  }
  
  // Appending two streams
export function appendStreams(stream1: ReadableStream, stream2: ReadableStream): ReadableStream {
    // Create a new readable stream that will combine both streams
    return new ReadableStream({
      async start(controller) {
        // Read from the first stream
        const reader1 = stream1.getReader();
        let result;
        while (!(result = await reader1.read()).done) {
          controller.enqueue(result.value);
        }
        reader1.releaseLock();
  
        // Read from the second stream
        const reader2 = stream2.getReader();
        while (!(result = await reader2.read()).done) {
          controller.enqueue(result.value);
        }
        reader2.releaseLock();
  
        // Close the controller when both streams have been read
        controller.close();
      }
    });
  }

function calculateMinCost() {
  const input = document.getElementById("rope-lengths");
	const answer = minCostToConnectRopes(input.value.split(",").map(e=>parseInt(e)))
	console.log(answer)
	document.getElementById("result").textContent = answer;
}  

function minCostToConnectRopes(ropes) {
	console.log(ropes)
  // Create a min heap to store the rope lengths
  const minHeap = new MinHeap();

  // Insert all the rope lengths into the min heap
  for (const rope of ropes) {
    minHeap.insert(rope);
  }

  let totalCost = 0;

  // Combine ropes until there's only one left in the heap
  while (minHeap.size() > 1) {
    // Extract the two shortest ropes
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of combining the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the combined rope length back into the min heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// Implementation of a MinHeap data structure
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestChildIndex = index;

      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex === index) {
        break;
      }

      this.swap(index, smallestChildIndex);
      index = smallestChildIndex;
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

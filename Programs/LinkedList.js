// Linked List operations

// individual nodes
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// main linked list class
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }

    // append linked list
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    // prepend linked list
    prepend(value) {
        const node = new Node(value);

        node.next = this.head;
        this.head = node;
        this.length++;
    }

    //  get Previous and Next Nodes
    getPrevNextNodes(index) {
        let count = 0;
        let prevNode = this.head;
        let nextNode = prevNode.next;

        while (count < index - 1) {
            prevNode = prevNode.next;
            nextNode = prevNode.next;
            count++;
        }

        return {
            prevNode,
            nextNode
        }
    }


    // insert into Linked List
    insert(value, index) {
        if (index >= this.length) {
            this.append(value);
        }

        const node = new Node(value);

        const {
            prevNode,
            nextNode
        } = this.getPrevNextNodes(index);
        prevNode.next = node;
        node.next = nextNode;

        this.length++;
    }

    // lookup Linked List
    lookup(index) {
        let counter = 0;
        let currentNode = this.head;
        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }
    // remove values from Linked List

    remove(index) {
        let {
            previousNode,
            currentNode
        } = this.getNodes(index);
        previousNode.next = currentNode.next;
        this.length--;
    }

    // reverse a Linked List

    reverse() {
        let previousNode = null;
        let currentNode = this.head;

        while (currentNode !== null) {
            let nextNode = currentNode.next;
            currentNode.next = previousNode;
            previousNode = currentNode;
            currentNode = nextNode;
        }

        this.head = previousNode;
    }
}

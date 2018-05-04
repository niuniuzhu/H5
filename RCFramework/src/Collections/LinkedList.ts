namespace RC.Collections {
	// A linked list node
	export interface ILinkedListNode<T> {
		element: T;
		next: ILinkedListNode<T> | null;
	}

	export class LinkedList<T> {

		/**
		* First node in the list
		* @type {Object}
		* @private
		*/
		public firstNode: ILinkedListNode<T> | null = null;
		/**
		* Last node in the list
		* @type {Object}
		* @private
		*/
		private lastNode: ILinkedListNode<T> | null = null;

		/**
		* Number of elements in the list
		* @type {number}
		* @private
		*/
		private nElements = 0;

		/**
		* Creates an empty Linked List.
		* @class A linked list is a data structure consisting of a group of nodes
		* which together represent a sequence.
		* @constructor
		*/
		constructor() { }

		/**
		* Adds an element to this list.
		* @param {Object} item element to be added.
		* @param {number=} index optional index to add the element. If no index is specified
		* the element is added to the end of this list.
		* @return {boolean} true if the element was added or false if the index is invalid
		* or if the element is null.
		*/
		public add(item: T, index?: number): boolean {
			if (Utils.isUndefined(index)) {
				index = this.nElements;
			}
			if (index < 0 || index > this.nElements || Utils.isUndefined(item)) {
				return false;
			}
			const newNode = this.createNode(item);
			if (this.nElements === 0 || this.lastNode === null) {
				// First node in the list.
				this.firstNode = newNode;
				this.lastNode = newNode;
			} else if (index === this.nElements) {
				// Insert at the end.
				this.lastNode.next = newNode;
				this.lastNode = newNode;
			} else if (index === 0) {
				// Change first node.
				newNode.next = this.firstNode;
				this.firstNode = newNode;
			} else {
				const prev = this.nodeAtIndex(index - 1);
				if (prev == null) {
					return false;
				}
				newNode.next = prev.next;
				prev.next = newNode;
			}
			this.nElements++;
			return true;
		}

		/**
		* Returns the first element in this list.
		* @return {*} the first element of the list or null if the list is
		* empty.
		*/
		public first(): T | null {

			if (this.firstNode !== null) {
				return this.firstNode.element;
			}
			return null;
		}

		/**
		* Returns the last element in this list.
		* @return {*} the last element in the list or null if the list is
		* empty.
		*/
		public last(): T | null {

			if (this.lastNode !== null) {
				return this.lastNode.element;
			}
			return null;
		}

		/**
		* Returns the element at the specified position in this list.
		* @param {number} index desired index.
		* @return {*} the element at the given index or null if the index is
		* out of bounds.
		*/
		public elementAtIndex(index: number): T | null {

			const node = this.nodeAtIndex(index);
			if (node === null) {
				return null;
			}
			return node.element;
		}

		/**
		* Returns the index in this list of the first occurrence of the
		* specified element, or -1 if the List does not contain this element.
		* <p>If the elements inside this list are
		* not comparable with the === operator a custom equals function should be
		* provided to perform searches, the function must receive two arguments and
		* return true if they are equal, false otherwise. Example:</p>
		*
		* <pre>
		* const petsAreEqualByName = function(pet1, pet2) {
		*  return pet1.name === pet2.name;
		* }
		* </pre>
		* @param {Object} item element to search for.
		* @param {function(Object,Object):boolean=} equalsFunction Optional
		* function used to check if two elements are equal.
		* @return {number} the index in this list of the first occurrence
		* of the specified element, or -1 if this list does not contain the
		* element.
		*/
		public indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number {

			const equalsF = equalsFunction || Utils.defaultEquals;
			if (Utils.isUndefined(item)) {
				return -1;
			}
			let currentNode = this.firstNode;
			let index = 0;
			while (currentNode !== null) {
				if (equalsF(currentNode.element, item)) {
					return index;
				}
				index++;
				currentNode = currentNode.next;
			}
			return -1;
		}


		/**
		* Returns true if this list contains the specified element.
		* <p>If the elements inside the list are
		* not comparable with the === operator a custom equals function should be
		* provided to perform searches, the function must receive two arguments and
		* return true if they are equal, false otherwise. Example:</p>
		*
		* <pre>
		* const petsAreEqualByName = function(pet1, pet2) {
		*  return pet1.name === pet2.name;
		* }
		* </pre>
		* @param {Object} item element to search for.
		* @param {function(Object,Object):boolean=} equalsFunction Optional
		* function used to check if two elements are equal.
		* @return {boolean} true if this list contains the specified element, false
		* otherwise.
		*/
		public contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean {
			return (this.indexOf(item, equalsFunction) >= 0);
		}

		/**
		* Removes the first occurrence of the specified element in this list.
		* <p>If the elements inside the list are
		* not comparable with the === operator a custom equals function should be
		* provided to perform searches, the function must receive two arguments and
		* return true if they are equal, false otherwise. Example:</p>
		*
		* <pre>
		* const petsAreEqualByName = function(pet1, pet2) {
		*  return pet1.name === pet2.name;
		* }
		* </pre>
		* @param {Object} item element to be removed from this list, if present.
		* @return {boolean} true if the list contained the specified element.
		*/
		public remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean {
			const equalsF = equalsFunction || Utils.defaultEquals;
			if (this.nElements < 1 || Utils.isUndefined(item)) {
				return false;
			}
			let previous: ILinkedListNode<T> | null = null;
			let currentNode: ILinkedListNode<T> | null = this.firstNode;

			while (currentNode !== null) {
				if (equalsF(currentNode.element, item)) {

					if (previous == null) { // currentNode is the first node
						this.firstNode = currentNode.next;
						if (currentNode === this.lastNode) {
							this.lastNode = null;
						}
					} else if (currentNode === this.lastNode) {
						this.lastNode = previous;
						previous.next = currentNode.next;
						currentNode.next = null;
					} else {
						previous.next = currentNode.next;
						currentNode.next = null;
					}
					this.nElements--;
					return true;
				}
				previous = currentNode;
				currentNode = currentNode.next;
			}
			return false;
		}

		/**
		* Removes all of the elements from this list.
		*/
		public clear(): void {
			this.firstNode = null;
			this.lastNode = null;
			this.nElements = 0;
		}

		/**
		* Returns true if this list is equal to the given list.
		* Two lists are equal if they have the same elements in the same order.
		* @param {LinkedList} other the other list.
		* @param {function(Object,Object):boolean=} equalsFunction optional
		* function used to check if two elements are equal. If the elements in the lists
		* are custom objects you should provide a function, otherwise
		* the === operator is used to check equality between elements.
		* @return {boolean} true if this list is equal to the given list.
		*/
		public equals(other: any, equalsFunction?: IEqualsFunction<T>): boolean {
			const eqF = equalsFunction || Utils.defaultEquals;
			if (!(other instanceof LinkedList)) {
				return false;
			}
			if (this.size() !== other.size()) {
				return false;
			}
			return this.equalsAux(this.firstNode, other.firstNode, eqF);
		}

		/**
		* @private
		*/
		private equalsAux(n1: ILinkedListNode<T> | null, n2: ILinkedListNode<T> | null, eqF: IEqualsFunction<T>): boolean {
			while (n1 !== null && n2 !== null) {
				if (!eqF(n1.element, n2.element)) {
					return false;
				}
				n1 = n1.next;
				n2 = n2.next;
			}
			return true;
		}

		/**
		* Removes the element at the specified position in this list.
		* @param {number} index given index.
		* @return {*} removed element or null if the index is out of bounds.
		*/
		public removeElementAtIndex(index: number): T | null {
			if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
				return null;
			}
			let element: T | null = null;
			if (this.nElements === 1) {
				// First node in the list.
				element = this.firstNode.element;
				this.firstNode = null;
				this.lastNode = null;
			} else {
				const previous = this.nodeAtIndex(index - 1);
				if (previous === null) {
					element = this.firstNode.element;
					this.firstNode = this.firstNode.next;
				} else if (previous.next === this.lastNode) {
					element = this.lastNode.element;
					this.lastNode = previous;
				}
				if (previous !== null && previous.next !== null) {
					element = previous.next.element;
					previous.next = previous.next.next;
				}
			}
			this.nElements--;
			return element;
		}

		/**
		* Executes the provided function once for each element present in this list in order.
		* @param {function(Object):*} callback function to execute, it is
		* invoked with one argument: the element value, to break the iteration you can
		* optionally return false.
		*/
		public forEach(callback: ILoopFunction<T>): void {
			let currentNode = this.firstNode;
			while (currentNode !== null) {
				if (callback(currentNode.element) === false) {
					break;
				}
				currentNode = currentNode.next;
			}
		}

		/**
		* Reverses the order of the elements in this linked list (makes the last
		* element first, and the first element last).
		*/
		public reverse(): void {
			let previous: ILinkedListNode<T> | null = null;
			let current: ILinkedListNode<T> | null = this.firstNode;
			let temp: ILinkedListNode<T> | null;
			while (current !== null) {
				temp = current.next;
				current.next = previous;
				previous = current;
				current = temp;
			}
			temp = this.firstNode;
			this.firstNode = this.lastNode;
			this.lastNode = temp;
		}

		/**
		* Returns an array containing all of the elements in this list in proper
		* sequence.
		* @return {Array.<*>} an array containing all of the elements in this list,
		* in proper sequence.
		*/
		public toArray(): T[] {
			const array: T[] = [];
			let currentNode: ILinkedListNode<T> | null = this.firstNode;
			while (currentNode !== null) {
				array.push(currentNode.element);
				currentNode = currentNode.next;
			}
			return array;
		}

		/**
		* Returns the number of elements in this list.
		* @return {number} the number of elements in this list.
		*/
		public size(): number {
			return this.nElements;
		}

		/**
		* Returns true if this list contains no elements.
		* @return {boolean} true if this list contains no elements.
		*/
		public isEmpty(): boolean {
			return this.nElements <= 0;
		}

		public toString(): string {
			return Arrays.toString(this.toArray());
		}

		/**
		* @private
		*/
		private nodeAtIndex(index: number): ILinkedListNode<T> | null {

			if (index < 0 || index >= this.nElements) {
				return null;
			}
			if (index === (this.nElements - 1)) {
				return this.lastNode;
			}
			let node = this.firstNode;
			for (let i = 0; i < index && node != null; i++) {
				node = node.next;
			}
			return node;
		}

		/**
		* @private
		*/
		private createNode(item: T): ILinkedListNode<T> {
			return {
				element: item,
				next: null
			};
		}
	}
}
namespace RC.Collections {
	export class MultiDictionary<K, V> {
		// Cannot do:
		// class MultiDictionary<K,V> extends Dictionary<K,Array<V>> {
		// Since we want to reuse the function name setValue and types in signature become incompatible
		// Therefore we are using composition instead of inheritance
		private dict: Dictionary<K, V[]>;
		private equalsF: IEqualsFunction<V>;
		private allowDuplicate: boolean;

		/**
		* Creates an empty multi dictionary.
		* @class <p>A multi dictionary is a special kind of dictionary that holds
		* multiple values against each key. Setting a value into the dictionary will
		* add the value to an array at that key. Getting a key will return an array,
		* holding all the values set to that key.
		* You can configure to allow duplicates in the values.
		* This implementation accepts any kind of objects as keys.</p>
		*
		* <p>If the keys are custom objects a function which converts keys to strings must be
		* provided. Example:</p>
		*
		* <pre>
		* function petToString(pet) {
		*  return pet.name;
		* }
		* </pre>
		* <p>If the values are custom objects a function to check equality between values
		* must be provided. Example:</p>
		*
		* <pre>
		* function petsAreEqualByAge(pet1,pet2) {
		*  return pet1.age===pet2.age;
		* }
		* </pre>
		* @constructor
		* @param {function(Object):string=} toStrFunction optional function
		* to convert keys to strings. If the keys aren't strings or if toString()
		* is not appropriate, a custom function which receives a key and returns a
		* unique string must be provided.
		* @param {function(Object,Object):boolean=} valuesEqualsFunction optional
		* function to check if two values are equal.
		*
		* @param allowDuplicateValues
		*/
		constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues = false) {
			this.dict = new Dictionary<K, V[]>(toStrFunction);
			this.equalsF = valuesEqualsFunction || Utils.defaultEquals;
			this.allowDuplicate = allowDuplicateValues;
		}
		/**
		* Returns an array holding the values to which this dictionary maps
		* the specified key.
		* Returns an empty array if this dictionary contains no mappings for this key.
		* @param {Object} key key whose associated values are to be returned.
		* @return {Array} an array holding the values to which this dictionary maps
		* the specified key.
		*/
		public getValue(key: K): V[] {
			const values = this.dict.getValue(key);
			if (Utils.isUndefined(values)) {
				return [];
			}
			return Arrays.copy(values);
		}

		/**
		 * Adds the value to the array associated with the specified key, if
		 * it is not already present.
		 * @param {Object} key key with which the specified value is to be
		 * associated.
		 * @param {Object} value the value to add to the array at the key
		 * @return {boolean} true if the value was not already associated with that key.
		 */
		public setValue(key: K, value: V): boolean {

			if (Utils.isUndefined(key) || Utils.isUndefined(value)) {
				return false;
			}
			const array = this.dict.getValue(key);
			if (Utils.isUndefined(array)) {
				this.dict.setValue(key, [value]);
				return true;
			}
			if (!this.allowDuplicate) {
				if (Arrays.contains(array, value, this.equalsF)) {
					return false;
				}
			}
			array.push(value);
			return true;
		}

		/**
		 * Removes the specified values from the array of values associated with the
		 * specified key. If a value isn't given, all values associated with the specified
		 * key are removed.
		 * @param {Object} key key whose mapping is to be removed from the
		 * dictionary.
		 * @param {Object=} value optional argument to specify the value to remove
		 * from the array associated with the specified key.
		 * @return {*} true if the dictionary changed, false if the key doesn't exist or
		 * if the specified value isn't associated with the specified key.
		 */
		public remove(key: K, value?: V): boolean {
			if (Utils.isUndefined(value)) {
				const v = this.dict.remove(key);
				return !Utils.isUndefined(v);
			}
			const array = this.dict.getValue(key);
			if (!Utils.isUndefined(array) && Arrays.remove(array, value, this.equalsF)) {
				if (array.length === 0) {
					this.dict.remove(key);
				}
				return true;
			}
			return false;
		}

		/**
		 * Returns an array containing all of the keys in this dictionary.
		 * @return {Array} an array containing all of the keys in this dictionary.
		 */
		public keys(): K[] {
			return this.dict.keys();
		}

		/**
		 * Returns an array containing all of the values in this dictionary.
		 * @return {Array} an array containing all of the values in this dictionary.
		 */
		public values(): V[] {
			const values = this.dict.values();
			const array: V[] = [];
			for (const v of values) {
				for (const w of v) {
					array.push(w);
				}
			}
			return array;
		}

		/**
		 * Returns true if this dictionary at least one value associatted the specified key.
		 * @param {Object} key key whose presence in this dictionary is to be
		 * tested.
		 * @return {boolean} true if this dictionary at least one value associatted
		 * the specified key.
		 */
		public containsKey(key: K): boolean {
			return this.dict.containsKey(key);
		}

		/**
		 * Removes all mappings from this dictionary.
		 */
		public clear(): void {
			this.dict.clear();
		}

		/**
		 * Returns the number of keys in this dictionary.
		 * @return {number} the number of key-value mappings in this dictionary.
		 */
		public size(): number {
			return this.dict.size();
		}

		/**
		 * Returns true if this dictionary contains no mappings.
		 * @return {boolean} true if this dictionary contains no mappings.
		 */
		public isEmpty(): boolean {
			return this.dict.isEmpty();
		}
	}
}

interface DataTransformer {
  serialize(object: unknown): unknown;
  deserialize(object: unknown): unknown;
}
interface InputDataTransformer extends DataTransformer {
  /**
   * This function runs **on the client** before sending the data to the server.
   */
  serialize(object: unknown): unknown;
  /**
   * This function runs **on the server** to transform the data before it is passed to the resolver
   */
  deserialize(object: unknown): unknown;
}
interface OutputDataTransformer extends DataTransformer {
  /**
   * This function runs **on the server** before sending the data to the client.
   */
  serialize(object: unknown): string;
  /**
   * This function runs **only on the client** to transform the data sent from the server.
   */
  deserialize(object: unknown): unknown;
}
interface CombinedDataTransformer {
  /**
   * Specify how the data sent from the client to the server should be transformed.
   */
  input: InputDataTransformer;
  /**
   * Specify how the data sent from the server to the client should be transformed.
   */
  output: OutputDataTransformer;
}



/* const transformer: CombinedDataTransformer = {
  input: {
    serialize: (object: unknown) => {
      console.log("ciao!")
      return JSON.stringify(object)
    },
    // This `eval` only ever happens on the **client**
    deserialize: (object: string) => JSON.parse(object),
  },
  output: {
    serialize: (object: unknown) => {
      console.log("ciao!")
      return JSON.stringify(object)
    },
    // This `eval` only ever happens on the **client**
    deserialize: (object: string) => JSON.parse(object),
  },
} */

const transformer: DataTransformer = {
  serialize: (object: unknown) => {
    return JSON.stringify(object)
  },
  // This `eval` only ever happens on the **client**
  deserialize: (object: string) => JSON.parse(object)
}

export default transformer;


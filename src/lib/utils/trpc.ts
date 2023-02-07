/* eslint-disable @typescript-eslint/no-explicit-any */
import superjson from 'superjson';
import * as devalue from 'devalue';
import type { SuperJSONResult, SuperJSONValue } from 'superjson/dist/types';

type SuperJsonTransformer = {
  serialize(object: SuperJSONValue): SuperJSONResult;
  deserialize<T = unknown>(payload: SuperJSONResult): T;
}


type DataTransformer = {
  serialize(object: any): string;
  deserialize(object: string): any;
};

type CombinedDataTransformer = {
  input: SuperJsonTransformer;
  output: DataTransformer;
};


const transformer: CombinedDataTransformer = {
  input: superjson,
  output: {
    serialize: (object: any) => devalue.stringify(object),
    deserialize: (object: string) => devalue.parse(object),
  },
};

export default transformer;


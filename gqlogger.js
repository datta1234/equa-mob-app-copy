import { print } from 'graphql/language/printer';
import Reactotron from 'reactotron-react-native';

// interface IValue {
//     data: {}
//     query: string
//     errors?: string[]
//     status?: number
// }

export const gqlogger = (
  props, //: { data: any },
  query //: { definitions: [{ kind: string; name: { value: string } }] },
) => {
  const value = {
    // value: IValue
    data: props.data,
    query: print(query),
  };

  if (props.data.error) {
    value.errors = [props.data.error.message];
    value.status = props.data.error.networkError.statusCode;

    if (props.data.error.networkError.result.errors) {
      value.errors.push(
        props.data.error.networkError.result.errors.map((e) => {
          //e: { message: string}
          return e.message;
        })
      );
    }
  }

  const operationDefinition = query.definitions.find((definition) => {
    return definition.kind === 'OperationDefinition';
  });

  const preview =
    operationDefinition.name && operationDefinition.name.value
      ? operationDefinition.name.value
      : print(query);
  const name = props.data.loading
    ? '[LOADING]'
    : props.data.error
    ? '[ERROR]'
    : '[SUCCESS]';

  Reactotron.display({
    important: !!props.data.error,
    name: `GQL ${name}`,
    preview,
    value,
  });
};

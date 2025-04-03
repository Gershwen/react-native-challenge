// types.ts

export type RootStackParamList = {
    Home: undefined; // Home screen does not require any parameters
    Edit: { item: Response }; // Edit screen requires an `item` parameter
  };
  
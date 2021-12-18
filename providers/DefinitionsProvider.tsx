import { getDefinitions } from '@astralstonk/api/definitions/definitions';
import { useLocalStorage } from '@astralstonk/hooks/useLocalStorage';
import {
  Definitions,
  useDefinitionsStore,
} from '@astralstonk/stores/definitions.store';
import { useSnackbar } from 'notistack';
import React, { createContext, FC, useEffect } from 'react';
import { useMutation } from 'react-query';

export const DefinitionsContext = createContext({
  updateDefinitions: () => {},
  isUpdating: false,
});

const DefinitionsProvider: FC = ({ children }) => {
  const [storedDefinitions, setStoredDefinitions] = useLocalStorage<
    | {
        updatedAt: string;
        definitions: Definitions;
      }
    | undefined
  >('definitions', undefined);
  const setDefinitions = useDefinitionsStore(({ set }) => set);

  // Load from localStorage on app initialization
  useEffect(() => {
    if (storedDefinitions) {
      const { updatedAt, definitions } = storedDefinitions;
      setDefinitions(new Date(updatedAt), definitions);
    }
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const getDefinitionsMutation = useMutation(getDefinitions);

  const updateDefinitions = () => {
    getDefinitionsMutation.mutate(undefined, {
      onSuccess: (definitions) => {
        const updatedAt = new Date();

        setDefinitions(updatedAt, definitions);
        setStoredDefinitions({
          updatedAt: updatedAt.toISOString(),
          definitions,
        });

        enqueueSnackbar('Definitions updated.', { variant: 'success' });
      },
    });
  };

  return (
    <DefinitionsContext.Provider
      value={{
        updateDefinitions,
        isUpdating: getDefinitionsMutation.isLoading,
      }}
    >
      {children}
    </DefinitionsContext.Provider>
  );
};

export default DefinitionsProvider;

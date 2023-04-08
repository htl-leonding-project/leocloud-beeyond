import { createContext, useContext } from 'react';

export const EnvContext = createContext({ apiUrl: '', basePath: '' });

export const useEnvContext = () => useContext(EnvContext);


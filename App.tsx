import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

import ErrorBoundary from './src/core/modules/ErrorBoundary';
import ManageThemeProvider from './src/core/styles/theme/ThemeProvider';
import FallbackScreen from './src/core/modules/FallbackScreen';
import AppNavigator from './src/routes/AppNavigator';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaContainer>
        <ManageThemeProvider>
          <ErrorBoundary fallback={<FallbackScreen />}>
            <AppNavigator />
          </ErrorBoundary>
        </ManageThemeProvider>
      </SafeAreaContainer>
    </SafeAreaProvider>
  );
}

export default observer(App);

const SafeAreaContainer = styled(SafeAreaView)({
  flex: 1,
});

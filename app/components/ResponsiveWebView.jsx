import React, { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResponsiveWebView = ({ 
  url, 
  title = "Web Content",
  showHeader = true,
  initialHeight = 300 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [webViewHeight, setWebViewHeight] = useState(initialHeight);
  const windowWidth = Dimensions.get('window').width;
  const webViewRef = useRef(null);
  
  // Responsive sizing based on screen width
  const getResponsiveStyles = () => {
    // Mobile (default)
    let containerStyle = "w-full rounded-lg overflow-hidden";
    
    // sm (640px+)
    if (windowWidth >= 640) {
      containerStyle = "w-11/12 mx-auto rounded-xl overflow-hidden shadow-xl";
    }
    
    // md (768px+)
    if (windowWidth >= 768) {
      containerStyle = "w-5/6 mx-auto rounded-xl overflow-hidden shadow-xl";
    }
    
    // lg (1024px+)
    if (windowWidth >= 1024) {
      containerStyle = "w-4/5 mx-auto rounded-xl overflow-hidden shadow-xl";
    }
    
    // xl (1280px+)
    if (windowWidth >= 1280) {
      containerStyle = "w-3/4 mx-auto rounded-xl overflow-hidden shadow-xl";
    }
    
    return containerStyle;
  };
  
  // JavaScript to inject to get content height
  const injectedJavaScript = `
    try {
      window.ReactNativeWebView.postMessage(
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      );
    } catch (e) {
      window.ReactNativeWebView.postMessage('300');
    }
    true;
  `;
  
  // Error component to show when WebView fails to load
  const ErrorComponent = () => (
    <View className="flex-1 justify-center items-center bg-[#1A2F1E] rounded-lg p-5">
      <Text className="text-red-400 text-lg font-semibold mb-2">Failed to load content</Text>
      <Text className="text-white text-center mb-4">There was a problem loading the content from {url}</Text>
      <Text 
        className="text-green-400 font-semibold p-2"
        onPress={() => {
          setError(false);
          if (webViewRef.current) {
            webViewRef.current.reload();
          }
        }}
      >
        Tap to retry
      </Text>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-[#0E1D12]">
      {showHeader && (
        <View className="px-4 py-3 bg-[#1A2F1E]">
          <Text className="text-white text-lg font-semibold">{title}</Text>
        </View>
      )}
      
      <View className={`flex-1 p-3 ${getResponsiveStyles()}`}>
        {loading && !error && (
          <View className="absolute inset-0 justify-center items-center z-10 bg-black/20">
            <ActivityIndicator size="large" color="#7BE495" />
          </View>
        )}
        
        {error ? (
          <ErrorComponent />
        ) : (
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={{ 
              height: webViewHeight, 
              backgroundColor: 'transparent',
              opacity: loading ? 0.8 : 1 
            }}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            injectedJavaScript={injectedJavaScript}
            onMessage={(event) => {
              try {
                const height = parseInt(event.nativeEvent.data);
                if (height > 0) {
                  setWebViewHeight(height);
                }
              } catch (e) {
                console.error("Error parsing height", e);
              }
            }}
            className="rounded-lg"
            showsVerticalScrollIndicator={false}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResponsiveWebView;
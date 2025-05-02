import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Home, Search, Bookmark, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react-native';
import ResponsiveWebView from './ResponsiveWebView';

export default function WebViewScreen() {
  const [url, setUrl] = useState('https://docs.expo.dev');
  const [inputUrl, setInputUrl] = useState('https://docs.expo.dev');
  const [title, setTitle] = useState('Expo Documentation');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [webViewRef, setWebViewRef] = useState(null);
  
  const [bookmarks, setBookmarks] = useState([
    { title: 'Expo Docs', url: 'https://docs.expo.dev' },
    { title: 'React Native', url: 'https://reactnative.dev' },
    { title: 'Tailwind CSS', url: 'https://tailwindcss.com' }
  ]);
  
  const { width } = useWindowDimensions();
  
  // Determine if we're on a large screen
  const isLargeScreen = width >= 768;
  
  // Handle when URL is changed
  const prepareUrl = (inputUrl) => {
    // Make sure URL has proper format
    if (inputUrl && !inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };
  
  // Navigate to a URL
  const navigateTo = (newUrl, newTitle) => {
    const formattedUrl = prepareUrl(newUrl);
    setIsLoading(true);
    setUrl(formattedUrl);
    setInputUrl(formattedUrl);
    if (newTitle) setTitle(newTitle);
  };
  
  // Add current page to bookmarks
  const addBookmark = () => {
    const exists = bookmarks.some(bookmark => bookmark.url === url);
    if (!exists) {
      setBookmarks([...bookmarks, { title, url }]);
    }
  };
  
  // Reference to the WebView component
  const handleWebViewRef = useCallback((ref) => {
    setWebViewRef(ref);
  }, []);
  
  // Handle navigation state changes
  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setTitle(navState.title);
    setUrl(navState.url);
    setInputUrl(navState.url);
  };
  
  // Render sidebar for larger screens
  const renderSidebar = () => {
    if (!isLargeScreen) return null;
    
    return (
      <View className="w-1/4 min-w-[250px] bg-[#1A2F1E] p-4 rounded-l-lg">
        <Text className="text-white text-xl font-bold mb-6">Bookmarks</Text>
        <ScrollView className="flex-1">
          {bookmarks.map((bookmark, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#263D2E] p-3 rounded-lg mb-3 flex-row items-center"
              onPress={() => navigateTo(bookmark.url, bookmark.title)}
            >
              <Bookmark size={16} color="#7BE495" className="mr-2" />
              <Text className="text-white">{bookmark.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          className="bg-[#7BE495] p-3 rounded-lg mt-4 items-center"
          onPress={addBookmark}
        >
          <Text className="text-[#1A2F1E] font-semibold">Add Current Page</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View className="flex-1 bg-[#0E1D12] pt-2">
      {/* Address bar */}
      <View className="px-3 pb-2">
        <View className={`flex-row items-center bg-[#1A2F1E] rounded-lg ${isLargeScreen ? 'px-4 py-3' : 'px-3 py-2'}`}>
          {/* Back button */}
          <TouchableOpacity 
            className="mr-1 opacity-70"
            disabled={!canGoBack}
            onPress={() => webViewRef?.goBack()}
          >
            <ChevronLeft size={isLargeScreen ? 22 : 18} color={canGoBack ? "#7BE495" : "#555"} />
          </TouchableOpacity>
          
          {/* Forward button */}
          <TouchableOpacity 
            className="mr-2 opacity-70"
            disabled={!canGoForward}
            onPress={() => webViewRef?.goForward()}
          >
            <ChevronRight size={isLargeScreen ? 22 : 18} color={canGoForward ? "#7BE495" : "#555"} />
          </TouchableOpacity>
          
          <TextInput
            className="flex-1 text-white"
            value={inputUrl}
            onChangeText={setInputUrl}
            placeholder="Enter URL..."
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="url"
            onSubmitEditing={() => navigateTo(inputUrl)}
          />
          <TouchableOpacity 
            className="ml-2"
            onPress={() => navigateTo(inputUrl)}
          >
            <Search size={isLargeScreen ? 24 : 20} color="#7BE495" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="ml-3"
            onPress={() => webViewRef?.reload()}
          >
            <RefreshCw size={isLargeScreen ? 24 : 20} color="#7BE495" />
          </TouchableOpacity>
          
          {!isLargeScreen && (
            <TouchableOpacity 
              className="ml-3"
              onPress={addBookmark}
            >
              <Bookmark size={20} color="#7BE495" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Content area with flexible layout based on screen size */}
      <View className="flex-1 flex-row">
        {/* Sidebar for larger screens */}
        {renderSidebar()}
        
        {/* WebView container */}
        <View className={`flex-1 ${isLargeScreen ? 'rounded-r-lg overflow-hidden' : ''}`}>
          <ResponsiveWebView 
            ref={handleWebViewRef}
            url={url}
            title={title}
            showHeader={false}
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
      </View>
      
      {/* Mobile-only bottom bookmarks bar */}
      {!isLargeScreen && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="bg-[#1A2F1E] py-2 px-2 mb-16"
        >
          <TouchableOpacity
            className="bg-[#263D2E] px-3 py-2 rounded-lg mr-2 flex-row items-center"
            onPress={() => navigateTo('https://docs.expo.dev', 'Expo Documentation')}
          >
            <Home size={16} color="#7BE495" className="mr-2" />
            <Text className="text-white">Home</Text>
          </TouchableOpacity>
          
          {bookmarks.map((bookmark, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#263D2E] px-3 py-2 rounded-lg mr-2 flex-row items-center"
              onPress={() => navigateTo(bookmark.url, bookmark.title)}
            >
              <Bookmark size={16} color="#7BE495" className="mr-2" />
              <Text className="text-white">{bookmark.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
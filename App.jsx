import {View, StyleSheet, Text, Linking} from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const onRampHTMLCode = `
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script src="https://stg.platform.onmeta.in/onmeta-sdk.js" type="text/javascript"></script>

  </head>
  <body>
  <div id="widget"> </div>
  <script>
  let createWidget=new onMetaWidget({
    elementId:"widget",
    apiKey:"b911cb3f-3e53-4faa-a4ad-43509c19baf2",
    userEmail:"joshic626@gmail.com",
    isAndroid:"enabled", 
  })
  createWidget.init();
  createWidget.on("ACTION_EVENTS",(data)=>{window.ReactNativeWebView.postMessage(JSON.stringify(data))}) 
  </script>
  </body>
  </html>
  `;

  const onRampEvent = event => {
    const eventData = JSON.parse(event?.nativeEvent?.data);
    if (eventData?.data?.type === 'UPI_FAST') {
      void Linking.openURL(eventData.data.link);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Onmeta</Text>
      <WebView
        originWhitelist={['*']}
        mixedContentMode="compatibility"
        source={{html: onRampHTMLCode}}
        renderLoading={() => {
          return <Text>Loading.......</Text>;
        }}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures
        scalesPageToFit={true}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        domStorageEnabled={true}
        onMessage={event => {
          onRampEvent(event);
        }}></WebView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
    zIndex: 999,
    marginTop: 20,
    zIndex: 999,
    marginTop: 50,
  },
  heading: {
    marginTop: 40,
    color: 'red',
    fontFamily: 'roboto',
    fontSize: 20,
    marginLeft: 120,
  },
});
jjjjjjjjjjjjjjjjjjjjjjjjj
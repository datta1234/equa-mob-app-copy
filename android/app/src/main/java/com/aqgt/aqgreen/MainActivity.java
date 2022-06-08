package com.aqgt.aqgreen;

import android.os.Bundle; 
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this); 
        // // Potential fix for Android crashes: https://github.com/software-mansion/react-native-screens/issues/17#issuecomment-887514057
        // if (savedInstanceState != null) {
		    //     	savedInstanceState.remove("android:support:fragments");
		    //     	savedInstanceState.remove("android:fragments");
	      //   }
        super.onCreate(savedInstanceState);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AQGreen";
  }
}

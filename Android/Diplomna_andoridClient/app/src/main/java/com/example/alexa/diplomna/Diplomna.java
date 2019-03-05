package com.example.alexa.diplomna;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.NonNull;
import android.support.design.widget.TabLayout;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;


import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.io.Console;
import java.io.IOException;
import java.net.URISyntaxException;


import static com.google.android.gms.location.LocationServices.getFusedLocationProviderClient;


public class Diplomna extends AppCompatActivity {

    public static String coords;
    private WebView webView;
    private TextView text;
    private EditText editText;
    public static String SERVER;
    private WebAppInterface1 webinterface;
    private android.support.design.widget.TabLayout tabLayout;
    private RelativeLayout view2;
    private FusedLocationProviderClient mFusedLocationClient;




    private LocationManager locationManager;
    private LocationListener locationListener;



    private LocationRequest mLocationRequest;

    private long UPDATE_INTERVAL = 10 * 1000;  /* 10 secs */
    private long FASTEST_INTERVAL = 2000; /* 2 sec */

    private Button anchorButton;
    private TextView longt;
    private TextView latd;




    public boolean anchorToggled=false;
    private Socket mSocket;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.ACCESS_COARSE_LOCATION}, 1);



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diplomna);
        // Find the view pager that will allow the user to swipe between fragments
        TabLayout tabLayout = (TabLayout) findViewById(R.id.TabLayouts);

        tabLayout.setVisibility(View.INVISIBLE);

        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {

            TabLayout tabLayout = (TabLayout) findViewById(R.id.TabLayouts);

            public void onTabSelected(TabLayout.Tab tab) {
                if(tabLayout.getSelectedTabPosition() == 0){
                    Toast.makeText(Diplomna.this, "Tab " + "Anchor control", Toast.LENGTH_LONG).show();
                    webView=(WebView) findViewById(R.id.webview);
                    webView.setVisibility(View.VISIBLE);
                    anchorButton=findViewById(R.id.anchorButton);
                    anchorButton.setVisibility(View.INVISIBLE);

                }else if(tabLayout.getSelectedTabPosition() == 1){
                    Toast.makeText(Diplomna.this, "Tab " + "User profile", Toast.LENGTH_LONG).show();
                    webView=(WebView) findViewById(R.id.webview);
                    webView.setVisibility(View.INVISIBLE);
                    anchorButton=findViewById(R.id.anchorButton);
                    anchorButton.setVisibility(View.VISIBLE);







                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

       // startService(new Intent(this,MyLocationService.class));

    }

    public void toggleanchoMode(View view){
        Intent myService=new Intent(this,MyLocationService.class);
        if (anchorToggled==false) {

            startService(myService);
            anchorToggled=true;
            anchorButton=findViewById(R.id.anchorButton);
            anchorButton.setText("Toggle anchor mode OFF");
            anchorButton.setBackgroundColor(Color.parseColor("#ffb1ad"));
            return;

        }
        if (anchorToggled==true){
            stopService(myService);
            anchorButton.setText("Toggle anchor mode ON");
            anchorButton.setBackgroundColor(Color.parseColor("#adffe2"));

            anchorToggled=false;return;

        }



    }



    public void openwebview(View view){                Log.d("test","alo");


        ViewGroup parentView = (ViewGroup) view.getParent();
        parentView.removeView(view);

        text=findViewById(R.id.textView);
        text.setVisibility(View.GONE);

        editText=findViewById(R.id.editText);
        editText.setVisibility(View.GONE);

        webView=(WebView) findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        SERVER=editText.getText().toString();

        SharedPreferences.Editor editor = getSharedPreferences("prefs", MODE_PRIVATE).edit();
        editor.putString("server", SERVER);
        editor.apply();

        webinterface=new WebAppInterface1(this);
        webView.addJavascriptInterface(webinterface,"Android");
        webView.loadUrl(SERVER);
     /*   try {
            mSocket = IO.socket(SERVER);
        } catch (URISyntaxException e) {}

        mSocket.connect();
        attemptSend();*/

    }



    /*private void attemptSend() {
        String message = "хи";
        if (TextUtils.isEmpty(message)) {
            return;
        }
        mSocket.emit("new message", message);
    }*/

    public void sendMessage(View view)
    {
        webView=findViewById(R.id.webview);
        webView.setVisibility(View.GONE);

    }

    public class WebAppInterface1{
        Context mContext;


        WebAppInterface1(Context c) {
            mContext = c;
        }


        @JavascriptInterface
        public void anchorMode() {
            new Handler(Looper.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    Log.d("UI thread", "I am the UI thread");

                    tabLayout=findViewById(R.id.TabLayouts);

                    tabLayout.setVisibility(View.VISIBLE);
                }
            });

        }

        @JavascriptInterface
        public void anchorModeOff() {
            new Handler(Looper.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    Log.d("UI thread", "I am the UI thread");

                    tabLayout=findViewById(R.id.TabLayouts);

                    tabLayout.setVisibility(View.GONE);
                }
            });

        }

        @JavascriptInterface
        public void getUser(String user) {
            SharedPreferences.Editor editor = getSharedPreferences("prefs", MODE_PRIVATE).edit();
            editor.putString("user", user);
            editor.apply();

        }



    }





}





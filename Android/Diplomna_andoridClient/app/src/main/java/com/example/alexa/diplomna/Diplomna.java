package com.example.alexa.diplomna;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
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
import android.util.Log;
import android.view.View;

import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

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

import static com.google.android.gms.location.LocationServices.getFusedLocationProviderClient;


public class Diplomna extends AppCompatActivity {
    private WebView webView;
    private TextView text;
    private EditText editText;
    public String SERVER;
    private WebAppInterface1 webinterface;
    private android.support.design.widget.TabLayout tabLayout;
    private RelativeLayout view2;
    private FusedLocationProviderClient mFusedLocationClient;




    private LocationManager locationManager;
    private LocationListener locationListener;



    private LocationRequest mLocationRequest;

    private long UPDATE_INTERVAL = 10 * 1000;  /* 10 secs */
    private long FASTEST_INTERVAL = 2000; /* 2 sec */


    private TextView longt;
    private TextView latd;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        EventBus.getDefault().register(this);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diplomna);
        // Find the view pager that will allow the user to swipe between fragments
        TabLayout tabLayout = (TabLayout) findViewById(R.id.TabLayouts);

        tabLayout.setVisibility(View.INVISIBLE);

        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {

            TabLayout tabLayout = (TabLayout) findViewById(R.id.TabLayouts);

            public void onTabSelected(TabLayout.Tab tab) {
                if(tabLayout.getSelectedTabPosition() == 0){
                    Toast.makeText(Diplomna.this, "Tab " + tabLayout.getSelectedTabPosition(), Toast.LENGTH_LONG).show();
                    webView=(WebView) findViewById(R.id.webview);
                    webView.setVisibility(View.VISIBLE);
                }else if(tabLayout.getSelectedTabPosition() == 1){
                    Toast.makeText(Diplomna.this, "Tab " + tabLayout.getSelectedTabPosition(), Toast.LENGTH_LONG).show();
                    webView=(WebView) findViewById(R.id.webview);
                    webView.setVisibility(View.INVISIBLE);






                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });






        startService(new Intent(this,MyLocationService.class));


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
        webinterface=new WebAppInterface1(this);
        webView.addJavascriptInterface(webinterface,"Android");
        webView.loadUrl(SERVER);

    }

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

    }


    @Subscribe
    public void onMessageEvent(MyLocationService.MessageEvent event) {
        longt=findViewById(R.id.longt);
        longt.setText("Longt:"+event.longt);
        longt=findViewById(R.id.latd);
        longt.setText("Longt:"+event.latd);
    }



}





package com.example.alexa.diplomna;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.design.widget.TabLayout;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
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
import com.google.android.gms.tasks.OnSuccessListener;

import java.io.Console;


public class Diplomna extends AppCompatActivity {
    private WebView webView;
    private TextView text;
    private EditText editText;
    public String SERVER;
    private WebAppInterface1 webinterface;
    private android.support.design.widget.TabLayout tabLayout;
    private RelativeLayout view2;
    private FusedLocationProviderClient mFusedLocationClient;

    private TextView longt;
    private TextView latd;



    LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
    private LocationCallback mLocationCallback;
    private LocationRequest mLocationRequest;



    @Override
    protected void onCreate(Bundle savedInstanceState) {





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


        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);


        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            // Check Permissions Now
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    1);
        } else {

            mFusedLocationClient.getLastLocation()
                    .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                        @Override
                        public void onSuccess(Location location) {

                            if (location != null) {
                                longt=findViewById(R.id.longt);
                                longt.setText("longtitude:" +location.getLongitude());

                                latd=findViewById(R.id.latd);
                                latd.setText("latitude:" + location.getLatitude());

                                // Logic to handle location object
                            }
                        }
                    });

            mFusedLocationClient.requestLocationUpdates(mLocationRequest,
                    mLocationCallback,
                    null /* Looper */);
        }




        mLocationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null) {
                    return;
                }
                for (Location location : locationResult.getLocations()) {
                    // Update UI with location data
                    // ...
                }
            };
        };





    }




    public void openwebview(View view){








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


}





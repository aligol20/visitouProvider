package com.visitouprovider;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;

import java.util.Timer;
import java.util.TimerTask;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
public class SplashScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        new android.os.Handler().postDelayed(
                new Runnable() {
                    public void run() {
                        Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                        startActivity(intent);
                        finish();

                    }
                }, 5000);


    }


}

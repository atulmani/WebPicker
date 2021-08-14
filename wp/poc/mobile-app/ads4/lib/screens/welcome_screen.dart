import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ads4/screens/login_screen.dart';
import 'package:ads4/screens/registration_screen.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:ads4/components/rounded_button.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> with SingleTickerProviderStateMixin {

  AnimationController controller;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    controller = AnimationController(
        duration: Duration(seconds: 1),
        vsync: this,
      upperBound: 1.0
    );

    controller.forward();
    controller.addListener(() {
      setState(() {

      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Hero(
                  tag: 'logo',
                  child: Container(
                    child: Image.asset('images/logo.png'),
                    height: 60.0,
                    // height: controller.value,
                  ),
                ),
                // TyperAnimatedTextKit(
                SizedBox(width: 10.0,),
                RotateAnimatedTextKit(
                  text:["Digi Ads","By","Web Picker"],
                  textAlign: TextAlign.start,
                  alignment: AlignmentDirectional.topCenter,
                  textStyle: TextStyle(
                    fontSize: 45.0,
                    fontWeight: FontWeight.w900,
                    color: Colors.red[400],

                  ),
                ),
              ],
            ),
            SizedBox(
              height: 48.0,
            ),
            MyRoundedButton(title: 'Log-in',color: Colors.lightBlueAccent, onPressed: (){ Navigator.pushNamed(context, LoginScreen.id); },),
            MyRoundedButton(title: 'Register',color: Colors.blueAccent, onPressed: (){ Navigator.pushNamed(context, RegistrationScreen.id); },),

          ],
        ),
      ),
    );
  }
}


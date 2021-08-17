import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:ads4/constants.dart';

class ChatScreen extends StatefulWidget {
  static const String id = 'chat_screen';
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _firestore = FirebaseFirestore.instance;
  final _auth = FirebaseAuth.instance;
  // FirebaseUser loggedInUser;
  User loggedInUser;
  String messageText;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    getCurrentuser();
  }

  void getCurrentuser() async {
    try {
      final currentUser = await _auth.currentUser;
      if (currentUser != null) {
        loggedInUser = currentUser;
        print(loggedInUser.email);
      }
    }catch(e)
    {
      print(e);
    }
  }

  void getMessages() async{
    try
    {
      // final messages = await _firestore.collection('messages').snapshots();
      // QuerySnapshot querySnapshot = await _firestore.collection('messages').snapshots();
      CollectionReference _collectionRef = FirebaseFirestore.instance.collection('messages');

      QuerySnapshot querySnapshot = await _collectionRef.get();
      final allData = querySnapshot.docs.map((doc) => doc.data()).toList();

      for (var message in allData){
        print(message);
      }
    }catch(e){
      print(e);
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: null,
        actions: <Widget>[
          IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                //Implement logout functionality
                getMessages();
                // _auth.signOut();
                // Navigator.pop(context);
              }),
        ],
        title: Text('⚡️Chat'),
        backgroundColor: Colors.lightBlueAccent,
      ),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Container(
              decoration: kMessageContainerDecoration,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: TextField(
                      onChanged: (value) {
                        //Do something with the user input.
                        messageText = value;
                      },
                      decoration: kMessageTextFieldDecoration,
                    ),
                  ),
                  FlatButton(
                    onPressed: () {
                      //Implement send functionality.
                      //messageText + loggedinUserEmail
                      _firestore.collection('messages').add({
                        'text': messageText,
                        'sender': loggedInUser.email
                      });
                    },
                    child: Text(
                      'Send',
                      style: kSendButtonTextStyle,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
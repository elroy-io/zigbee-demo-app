#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>
#include <LiquidCrystal.h>

YunServer server;
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);

  lcd.print("Fuck No Tricks!!");

  Bridge.begin();
  server.listenOnLocalhost();
  server.begin();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Waiting for data");
}

void loop() {
  YunClient client = server.accept();
  if (client) {
    process(client);
    client.stop();
  }

  delay(50); // Poll every 50ms
}

void process(YunClient client) {
  String command = client.readStringUntil('/');

  // is "digital" command?
  if (command == "update")
    updatelcd(client);

}

void updatelcd(YunClient client) {
  int valA;
  int valB;

  // Read pin number
  valA = client.parseInt();

  // If the next character is a '/' it means we have an URL
  // with a value like: "/digital/13/1"
  if (client.read() == '/') {
    valB = client.parseInt();
  }

  // Send feedback to client
  client.print(F("Updating Client:"));
  client.print(valA);
  client.print(F(" "));
  client.println(valB);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(F("Val 1: "));
  lcd.print(valA);

  lcd.setCursor(0, 1);
  lcd.print(F("Val 2: "));
  lcd.print(valB);
}


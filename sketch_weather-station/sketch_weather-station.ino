#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x3F, 16, 2); //Declara la variable para el display de 16x2.

const int p2 = 2; //Declara el pin del boton.
const int p6 = 6; //Declara el pin del sensor DHT11.
const int p8 = 8; //Declara el pin del sensor DS18B20.

int temp;
int humedad;

DHT dht (p6, DHT11); //Declara la variable del sensor.

void setup() {
  // put your setup code here, to run once:
  lcd.begin(); //Inicaliza el display.
  dht.begin(); //Inicializa el sensor DHT11.

  Serial.begin(9600);
  Serial.println("---------------------");
  Serial.println("Welcome - Init device.");
  Serial.println("---------------------");
  
  lcd.backlight();
  lcd.setBacklight(HIGH);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Inicializando..");
  lcd.setCursor(0, 1);
  for (int i=0;i<17;i++) {
    lcd.setCursor(i, 1); 
    lcd.write(4);
    delay(600);
  }
  delay(1000);
  lcd.clear();

  //attachInterrupt(digitalPinToInterrupt(p2), setDataDisplay, RISING);
}

void loop() {
  // put your main code here, to run repeatedly:
  getTemperaturas();
  showData();
  delay(5000); //Actualización cada 5s.
}

void printDataDHT(){
  lcd.clear();
  
  lcd.setCursor(0,0);
  lcd.print("Temp: ");
  lcd.print(temp);
  lcd.print((char)223);

  Serial.print("Temperatura: ");
  Serial.print(temp);
  Serial.println("ºC");
  
  lcd.setCursor(0,1);
  lcd.print("Humedad: ");
  lcd.print(humedad);
  lcd.print("%");

  Serial.print("Humedad DHT11: ");
  Serial.print(humedad);
  Serial.println("%");
}

void showData(){
  printDataDHT();
}

void getTemperaturas(){
  humedad = dht.readHumidity();
  temp = dht.readTemperature();
}

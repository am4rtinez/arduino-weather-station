#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x3F, 16, 2); //Declara la variable para el display de 16x2.

const int p2 = 2; //Declara el pin del boton.
const int p6 = 6; //Declara el pin del sensor DHT11.
const int p8 = 8; //Declara el pin del sensor DS18B20.

unsigned long lastRead;
int temp;
int humedad;
int contador;
volatile bool dataDisplay;
bool forzarPrint;

float tempSensor1;

DHT dht (p6, DHT11); //Declara la variable del sensor.

OneWire oneWireObjeto(p8);
DallasTemperature sensorDS18B20(&oneWireObjeto);

DeviceAddress sensor1 = { 0x28, 0xFF, 0x4C, 0x31, 0x21, 0x17, 0x04, 0x9B };

void setup() {
  // put your setup code here, to run once:
  lcd.begin(); //Inicaliza el display.
  dht.begin(); //Inicializa el sensor DHT11.
  sensorDS18B20.begin(); //Inicializa el sensor DS18B20.
  sensorDS18B20.setResolution(sensor1, 9);
  dataDisplay = false;
  forzarPrint = true;
  lastRead = 0; 

  Serial.begin(9600);
  Serial.println("---------------------");
  Serial.println("Welcome - Init device.");
  Serial.println("---------------------");
  
  Serial.print("Variable dataDisplay: ");
  Serial.println(dataDisplay);
  
  lcd.backlight();
  lcd.setBacklight(HIGH);
  lcd.setCursor(0, 0);
  lcd.print("WELCOME");
  lcd.setCursor(0, 1);
  lcd.print("Init Device");
  delay(2500);
  lcd.clear();

  attachInterrupt(digitalPinToInterrupt(p2), setDataDisplay, RISING);
}

void loop() {
  // put your main code here, to run repeatedly:
  if ((forzarPrint == true)||(millis()-lastRead >= 10000)){
    forzarPrint = false;  //Deshabilitamos el primer set del display.
    getTemperaturas(sensor1);
    showData();
    lastRead = millis();
  }
}

void printDataDS18B20()
{
  if (tempSensor1 == -127.00) {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Error dev DS18B20");
    
    Serial.println("Error dev DS18B20");
    
  } else {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Temp DS18B20: ");
    lcd.setCursor(0,1);
    lcd.print(tempSensor1);
    lcd.print((char)223);
    
    Serial.print("Temperatura DS18B20: ");
    Serial.print(tempSensor1);
    Serial.println("ºC");
  }
}

void printDataDHT(){
  lcd.clear();
  
  lcd.setCursor(0,0);
  lcd.print("TempDHT11: ");
  lcd.print(temp);
  lcd.print((char)223);

  Serial.print("Temperatura DHT11: ");
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

void setDataDisplay(){
  dataDisplay = !dataDisplay;
  forzarPrint = true;
  Serial.print("Variable dataDisplay: ");
  Serial.println(dataDisplay);
  delay(600);
}

void showData(){
  if (dataDisplay == false){
    printDataDHT();
  }else{
    printDataDS18B20();    
  }
}

void getTemperaturas(DeviceAddress deviceAddress){
  humedad = dht.readHumidity();
  temp = dht.readTemperature();
  sensorDS18B20.requestTemperatures();
  tempSensor1 = sensorDS18B20.getTempC(deviceAddress);  
}

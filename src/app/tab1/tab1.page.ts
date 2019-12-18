import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { LocationService } from '../location.service';
import { ToastController } from '@ionic/angular';
import { Uid } from '@ionic-native/uid/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  location = {
    name:'',
    cp:'',
    address:'',
    district:'',
    phone:'',
    latitude:0,
    longitude:0,
    createuser:'fulan',
    imei:''
  }
  disableEntryButton = false
  imei
  constructor(
    private geolocation: Geolocation,
    private locationService:LocationService,
    private toastController: ToastController,
    private uid: Uid,
    private androidPermissions: AndroidPermissions
  ) 
  {
    this.reload()
    this.getImei(imei=>{
      this.location.imei = imei
    })
  }
  clear(){
    this.location.name = ''
    this.location.cp = ''
    this.location.address = ''
    this.location.phone = ''
  }
  reload(){
    this.geolocation.getCurrentPosition().then(location=>{
      console.log(location.coords.longitude)
      this.location.latitude = location.coords.latitude
      this.location.longitude = location.coords.longitude
    }).catch(err=>{
      console.log("Error",err)
    })
  }
  getData(location){
    this.locationService.getData(res=>{
      console.log("Result of getData",res)
    })
  }
  saveEntry(location){
    this.locationService.saveData(location,res=>{
      console.log("Result of saveData",res)
    })
    this.disableEntryButton = true
    this.showConfirm()
  }
    async showConfirm(){
    const toast = await this.toastController.create({
      header:'Konfirmsi',
      message:'Entri Lokasi sudah tersimpan',
      position:'top',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    toast.onDidDismiss().then(
      res => {
        console.log("Entri saved")
        this.disableEntryButton = false
        this.clear()
      }
    )
    toast.present();
  }
  async getImei(callback){
    const {hasPermission } = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
    if(!hasPermission){
      const result = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      if(!result.hasPermission){
        throw new Error("Permission Needed");
      }
      return 
    }
    callback(this.uid.IMEI)
  }
}

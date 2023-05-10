class ManageWords extends Global {
  constructor(){
    super()
    this.valid = new Validation();
    this.publish = new PublishedGlobal();
    this.dev = new DevPublishedGlobal();
  }
}




public without sharing class RetailRate {
    public FindCity Origin {get; set;}
    public FindCity Destination {get; set;}
    public string VehicleName {get; set;}
    public string VehicleClass {get; set;}
    public string VehicleId {get; set;}
    public string Affiliate {get; set;}
    public decimal VehicleCost {get; set;}
    public decimal VehicleCostModifier {get; set;}
    public FindCity.Terminal OriginTerminal {get; set;}
    public FindCity.Terminal DestinationTerminal {get; set;}
    public SBQQ__Quote__c Qte {get; set;}
    public string NoteExternal {get; set;}
    public string Email {get; set;}
    public Date Pickup {get; set;}
    public string Error {get; set;}
    public boolean IsWeb {get; set;}
    public List<Contact> Contacts {get; set;}
    public List<SBQQ__QuoteLine__c> QuoteLines {get; set;}
    public QuoteResponse QR { get; set;}
    public string ServiceType { get; set; }
    public boolean IsConsumer { get; set; }
    public CAN_Cost.CANCostInputModel Input { get; set; } // = new CAN_Cost.CANCostInputModel();
    public CAN_Cost.CANCostOutputModel Output {get; set; }// = new CAN_Cost.CANCostOutputModel();
    private List<FindCity.Terminal> OriginTerminals {get; set;}
    private List<FindCity.Terminal> DestinationTerminals {get; set;}
    private boolean IsUpdate {get; set;}
    private decimal DootToDoorDist {get; set;}
    
    private string PrimaryContact_FirstName { get; set; }
    private string PrimaryContact_LastName { get; set; }
    private string PrimaryContact_Email { get; set; }
    private string PrimaryContact_Phone { get; set; }
    private string PrimaryContact_PhoneSecondary { get; set; }
    private string PrimaryContact_BestTimeToCall { get; set; }
    
    private SBQQ__QuoteLine__c VehicleRelocation {get; set;}
    private SBQQ__QuoteLine__c VehicleClassQL {get; set;}
    private SBQQ__QuoteLine__c OriginLoad {get; set;}
    private SBQQ__QuoteLine__c TransitLoad {get; set;}
    private SBQQ__QuoteLine__c DestinationLoad {get; set;}
    private SBQQ__QuoteLine__c FuelSurcharge {get; set;}
    
    private Product2 product_transit_load {get; set;}
    private Product2 product_vehicle_class {get; set;}
    private Product2 product_origin_load {get; set;}
    private Product2 product_destination_load {get; set;}
    private Product2 product_vehicle_relocation {get; set;}
    private Product2 product_fuel_surcharge {get; set;}
    private SBQQ__ProductOption__c product_option_transit_load {get; set;}
    private SBQQ__ProductOption__c product_option_vehicle_class {get; set;}
    private SBQQ__ProductOption__c product_option_origin_load {get; set;}
    private SBQQ__ProductOption__c product_option_destination_load {get; set;}
    private SBQQ__ProductOption__c product_option_vehicle_relocation {get; set;}
    private SBQQ__ProductOption__c product_option_fuel_surcharge {get; set;}
    
    public decimal DD  {get; set;}
    public decimal TT  {get; set;}
    public decimal TD  {get; set;}
    public decimal DT  {get; set;}
    public decimal CC  {get; set;}
    
    private decimal addition_markup = 0;
    private boolean IsNew = False;
    private string NoteNew;
    private Double TransitCost;
    
    public RetailRate() {
        this.Error = '';
        this.IsWeb = false;
        this.NoteExternal = '';
        this.IsConsumer = false;
        this.Input = new CAN_Cost.CANCostInputModel();
        this.Output = new CAN_Cost.CANCostOutputModel();
        this.OriginTerminals = null;
        this.DestinationTerminals = null;
        this.IsUpdate = false;
        
        this.VehicleRelocation = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100);
        this.VehicleClassQL = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100);
        this.OriginLoad = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100);
        this.TransitLoad = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100, SBQQ__AdditionalDiscountAmount__c = 0);
        this.DestinationLoad  = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100);
        this.FuelSurcharge = new SBQQ__QuoteLine__c(SBQQ__Number__c = 100);
        
        this.product_transit_load = null;
        this.product_vehicle_class = null;
        this.product_origin_load = null;
        this.product_destination_load = null;
        this.product_vehicle_relocation = null;
        this.product_fuel_surcharge = null;
        this.product_option_transit_load = null;
        this.product_option_vehicle_class = null;
        this.product_option_origin_load = null;
        this.product_option_destination_load = null;
        this.product_option_vehicle_relocation = null;
        this.product_option_fuel_surcharge = null;
        
        this.PrimaryContact_FirstName = 'Primary';
    	this.PrimaryContact_LastName = 'Contact';
    	this.PrimaryContact_Email = '';
    	this.PrimaryContact_Phone = '';
    	this.PrimaryContact_PhoneSecondary = '';
    	this.PrimaryContact_BestTimeToCall = '';
        this.NoteNew = '';
    }

    public void LoadFromGetParameters() {
        //origin
        this.Origin = new FindCity();
        this.Origin.Street = CONVERT.toString(ApexPages.currentPage().getParameters().get('OriginStreet'),'');
        this.Origin.City = CONVERT.toString(ApexPages.currentPage().getParameters().get('OriginCity'),'');
        this.Origin.State = CONVERT.toString(ApexPages.currentPage().getParameters().get('OriginState'),'');
        this.Origin.Zip = CONVERT.toString(ApexPages.currentPage().getParameters().get('OriginPostalCode'),'');
        this.Origin.Latitude = CONVERT.toDecimal(ApexPages.currentPage().getParameters().get('OriginLatitude'),0);
        this.Origin.Longitude = CONVERT.toDecimal(ApexPages.currentPage().getParameters().get('OriginLongitude'),0);
        this.Origin.Country = CONVERT.toString(ApexPages.currentPage().getParameters().get('OriginCountry'),'United States');
        
        //destination
        this.Destination = new FindCity();
        this.Destination.Street = CONVERT.toString(ApexPages.currentPage().getParameters().get('DestinationStreet'),'');
        this.Destination.City = CONVERT.toString(ApexPages.currentPage().getParameters().get('DestinationCity'),'');
        this.Destination.State = CONVERT.toString(ApexPages.currentPage().getParameters().get('DestinationState'),'');
        this.Destination.Zip = CONVERT.toString(ApexPages.currentPage().getParameters().get('DestinationPostalCode'),'');
        this.Destination.Latitude = CONVERT.toDecimal(ApexPages.currentPage().getParameters().get('DestinationLatitude'),0);
        this.Destination.Longitude = CONVERT.toDecimal(ApexPages.currentPage().getParameters().get('DestinationLongitude'),0);
        this.Destination.Country = CONVERT.toString(ApexPages.currentPage().getParameters().get('DestinationCountry'),'United States');
        this.Affiliate = CONVERT.toString(ApexPages.currentPage().getParameters().get('Affiliate'),'United States');
        
        this.VehicleName = CONVERT.toString(ApexPages.currentPage().getParameters().get('VehicleName'),'');
        this.VehicleClass = ApexPages.currentPage().getParameters().get('VehicleClass');
        this.Email = ApexPages.currentPage().getParameters().get('Email');
        try { this.Pickup = Date.valueOf(ApexPages.currentPage().getParameters().get('PickupDate'));}
        catch (Exception ex) {this.Pickup = Date.Today();}
        this.TranslateVehicle();
        
        //load from quote
        this.IsWeb = true;
        this.IsConsumer = true;
        //this.Pickup = CONVERT.toDate(ApexPages.currentPage().getParameters().get('PickupDate'), Date.Today());
        this.BuildProducts();
        this.Qte = new SBQQ__Quote__c();
        this.Qte.LockOrigin__c = false;
        this.Qte.LockDestination__c = false;
        this.ServiceType = SERVICE_TYPE_TerminalService;
        //this.Qte = [select Id, SBQQ__NetAmount__c, Name, SBQQ__Notes__c, Origin_Contact__c, Destination_Contact__c, SBQQ__PrimaryContact__c, SBQQ__StartDate__c from SBQQ__Quote__c where Id = :this.Qte.Id];
        //this.Contacts = [select Id,Email,MailingStreet,MailingCity,MailingState,MailingPostalCode, Vehicle_Name__c from Contact where Id in (:this.Qte.Origin_Contact__c,:this.Qte.SBQQ__PrimaryContact__c,:this.Qte.Destination_Contact__c)];
    }
    
    public void LoadFromQuote(string qid) {
        this.Qte = [select Id, CreatedDate, LockOrigin__c, LockDestination__c, SBQQ__NetAmount__c, Name, SBQQ__Notes__c, Origin_Terminal__c, Origin_Contact__c, Destination_Terminal__c, Destination_Contact__c, SBQQ__PrimaryContact__c, SBQQ__StartDate__c, SBQQ__Account__r.pServiceType__c, SBQQ__Account__r.Type from SBQQ__Quote__c where Id = :qid];
        this.Contacts = [select Id,Email,MailingStreet,MailingCity,MailingState,MailingPostalCode, Vehicle_Name__c, pServiceType__c  from Contact where Id in (:this.Qte.Origin_Contact__c,:this.Qte.SBQQ__PrimaryContact__c,:this.Qte.Destination_Contact__c)];
        this.ServiceType = this.Qte.SBQQ__Account__r.pServiceType__c;
        
        for(integer i = 0; i < this.Contacts.Size(); i++) {
            if (this.Contacts[i].Id == this.Qte.Origin_Contact__c) {
                try {
                    this.Origin = new FindCity();
                    this.Origin.Street = this.Contacts[i].MailingStreet;
                    this.Origin.City = this.Contacts[i].MailingCity;
                    this.Origin.State = this.Contacts[i].MailingState;
                    this.Origin.Zip = this.Contacts[i].MailingPostalCode;
                    this.Origin.Latitude = 0;
                    this.Origin.Longitude = 0;
                    this.Origin.Country = 'United States';
                } catch (Exception ex) {
                    this.Log(ex);
                    this.Error = 'Origin Contact';
                }
            } else if (this.Contacts[i].Id == this.Qte.Destination_Contact__c) {
                try {
                    this.Destination = new FindCity();
                    this.Destination.Street = this.Contacts[i].MailingStreet;
                    this.Destination.City = this.Contacts[i].MailingCity;
                    this.Destination.State = this.Contacts[i].MailingState;
                    this.Destination.Zip = this.Contacts[i].MailingPostalCode;
                    this.Destination.Latitude = 0;
                    this.Destination.Longitude = 0;
                    this.Destination.Country = 'United States';
                } catch (Exception ex) {
                    this.Log(ex);
                    this.Error = 'Destination Contact';
                }
            } else if (this.Contacts[i].Id == this.Qte.SBQQ__PrimaryContact__c) {
                try {
                    if (!string.isBlank(this.Contacts[i].pServiceType__c)) { this.ServiceType = this.Contacts[i].pServiceType__c; }
                    Vehicle__c veh = [select Id, fdPrice__c, fsClass__c, fpCostModifier__c from Vehicle__c where Id = :this.Contacts[i].Vehicle_Name__c];
                    this.VehicleCost = veh.fdPrice__c;
                    this.VehicleClass = veh.fsClass__c;
                    this.VehicleId = veh.Id;
                    this.VehicleCostModifier = (veh.fpCostModifier__c / 100.0);
                    this.Email = this.Contacts[i].Email;
                } catch (Exception ex) {
                    this.Log(ex);
                    this.Error = 'Vehicle';
                }
            }
        }
    
        this.Pickup = this.Qte.SBQQ__StartDate__c;
        this.IsWeb = false;
        
        //set consumer flag
        this.IsConsumer = (this.Qte.SBQQ__Account__r.Type == 'Consumer');
        this.BuildProducts();
        
        if (string.isBlank(this.Error)) {
            try {
                this.QuoteLines = 
                    [select Id, 
                            Load_Type__c,
                            SBQQ__Group__c,
                            SBQQ__Quote__c,
                            SBQQ__Product__c,
                            SBQQ__Quantity__c,
                            SBQQ__ListPrice__c,
                            SBQQ__NetPrice__c,
                            SBQQ__UnitCost__c,
                            SBQQ__MarkupAmount__c,
                            SBQQ__Number__c,
                            SBQQ__Description__c,
                            SBQQ__ProductOption__c,
                            SBQQ__RequiredBy__c,
                            SBQQ__Bundle__c,
                     		SBQQ__AdditionalDiscountAmount__c
                     from SBQQ__QuoteLine__c 
                     where SBQQ__Quote__c = :qid
                     order by SBQQ__Number__c desc];
                     
                if (this.QuoteLines != null) {
                    if (this.QuoteLines.Size() > 0) {
                        this.IsUpdate = true;
                        for (SBQQ__QuoteLine__c ql :this.QuoteLines) {
                            if (ql.SBQQ__Product__c == product_transit_load.id) { this.TransitLoad = ql; }
                            if (ql.SBQQ__Product__c == product_vehicle_class.id) { this.VehicleClassQL = ql; }
                            if (ql.SBQQ__Product__c == product_origin_load.id) { this.OriginLoad = ql; }
                            if (ql.SBQQ__Product__c == product_destination_load.id) { this.DestinationLoad = ql; }
                            if (ql.SBQQ__Product__c == product_vehicle_relocation.id) { this.VehicleRelocation = ql; }
                            if (!this.IsConsumer && ql.SBQQ__Product__c == product_fuel_surcharge.id) { this.FuelSurcharge = ql; }
                        }
                    }
                    else { this.IsUpdate = false; }
                }
            } catch (Exception ex) {
                this.Log(ex);
            }
        }
        
        //if corp, set markup to 0
        if (!this.IsConsumer) {
            this.markup_transit = 0;
            this.markup_door = 0;
        }
    }
    
    public string Calculate() {
        return Calculate(false);
    }
    
    public string Calculate(boolean forceOld) {
        
        if (string.isBlank(this.Error)) {
            //check for USA USA USA!!!
            if(this.Origin.Country.Trim() != 'United States' 
                || this.Destination.Country.Trim() != 'United States'
                || this.Origin.State == 'HI' 
                || this.Destination.State == 'HI'
                || this.Origin.State == 'AK' 
                || this.Destination.State == 'AK') {
                this.Error = 'Quote is not CONUS';
            }
        }
        if (this.TransitLoad.SBQQ__AdditionalDiscountAmount__c == null) { 
            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c = 0;
        } else {
            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c = math.abs(this.TransitLoad.SBQQ__AdditionalDiscountAmount__c);
        }
        
        this.NoteExternal += 
            '\n\rEmail: ' + CONVERT.toString(this.Email,'') +
            '\n\rOrigin Street: ' + CONVERT.toString(this.Origin.Street,'') + 
            '\n\rOrigin City: ' + CONVERT.toString(this.Origin.City,'') + 
            '\n\rOrigin State: ' + CONVERT.toString(this.Origin.State,'') + 
            '\n\rOrigin Country: ' + CONVERT.toString(this.Origin.Country,'') +
            '\n\rDestination Street: ' + CONVERT.toString(this.Destination.Street,'') + 
            '\n\rDestination City: ' + CONVERT.toString(this.Destination.City,'') + 
            '\n\rDestination State: ' + CONVERT.toString(this.Destination.State,'') +
            '\n\rDestination Country: ' + CONVERT.toString(this.Destination.Country,'') +
            '\n\rPickup Date: ' + CONVERT.toString(this.Pickup,'') + 
            '\n\rVehicle Class: ' + CONVERT.toString(this.VehicleClass,'') + 
            '\n\rVehicle Name: ' + CONVERT.toString(this.VehicleName,'') + 
            '\n\rAffiliate: ' + CONVERT.toString(this.Affiliate,'');
        
        
        DateTime startDate = DateTime.parse(SETTING.GetApexSetting('RetailRate', 'RetailRate_NewStartTime'));// '10/14/2011 11:46 AM');
        if ((this.Qte.CreatedDate != null && this.Qte.CreatedDate < startDate) || forceOld) {
            CalculateOld();
        } else { CalculateNew(); }
        
        //save the quote
        this.SaveQuote();
        
        return this.Error;
    }
    
    public void CalculateNew() {
		this.IsNew = True;        
        rateengineWSDL.Vehicle v = new rateengineWSDL.Vehicle();
        v.VehicleId = 0;
        
        if (this.VehicleClass == 'Standard') {
            v.VehicleId = 9255;
        } else if (this.VehicleClass == 'Oversized 1') {
            v.VehicleId = 9252;
        } else if (this.VehicleClass == 'Oversized 2') {
            v.VehicleId = 9253;
        } else if (this.VehicleClass == 'Oversized 3') {
            v.VehicleId = 9254;
        } else {
            this.VehicleName = 'Error';
            this.VehicleClass = 'Oversized 4';
            this.VehicleCostModifier = 3;
            this.Error = 'OV4 Unrateable';
        }
                
        if (string.isBlank(this.Error)) {
            rateengineWSDL.RateSoap RR = new rateengineWSDL.RateSoap();
            
            //build the request
            rateengineWSDL.RateRequest r = new rateengineWSDL.RateRequest();
            
            //check for terminal lock
            if (this.Qte.LockOrigin__c && this.Qte.Origin_Terminal__c != null) {
                r.OriginTerminal = this.Qte.Origin_Terminal__c;
            }
            
            if (this.Qte.LockDestination__c  && this.Qte.Destination_Terminal__c != null) {
                r.DestinationTerminal = this.Qte.Destination_Terminal__c;
            }
            
            rateengineWSDL.Location orig = new rateengineWSDL.Location();
            orig.Address = this.Origin.Street;
            orig.City = this.Origin.City;
            orig.State = this.Origin.State;
            orig.Zip = this.Origin.Zip;
            
            rateengineWSDL.Location dest = new rateengineWSDL.Location();
            dest.Address = this.Destination.Street;
            dest.City = this.Destination.City;
            dest.State = this.Destination.State;
            dest.Zip = this.Destination.Zip;
            
            r.Origin = orig;
            r.Destination = dest;
            
            r.PickupDate = this.Pickup;
            
            r.Vehicle = v;
            rateengineWSDL.RateResponse resp = RR.GetRate(r);
            
            string str = JSON.serialize(resp);
            Util.Log('RetailRate',str);
            
            RateEngineJSON rej = new RateEngineJSON();
            rej.Rates = new List<RateEngineJSON.Rates>();
            for (rateengineWSDL.Rate c :resp.Rates.Rate) {
                RateEngineJSON.Rates rate = new RateEngineJSON.Rates();
                rate.Amount = c.Amount;
               	
                if (c.RateType == 'CARRIER_DIRECT') { rate.RateType = 0; }
                else if (c.RateType == 'DOOR_TO_DOOR') { rate.RateType = 1; }
                else if (c.RateType == 'TERMINAL_TO_DOOR') { rate.RateType = 2; }
                else if (c.RateType == 'DOOR_TO_TERMINAL') { rate.RateType = 3; }
                else if (c.RateType == 'TERMINAL_TO_TERMINAL') { rate.RateType = 4; }
                
                RateEngineJSON.Terminal term = new RateEngineJSON.Terminal();
                term.SFID = c.Origin.SFID;
                term.Distance = c.Origin.Distance;
                term.Name = c.Origin.Name;
                term.Cost = c.Origin.Cost;
                term.AdminFee = c.Origin.AdminFee;
                rate.Origin = term;
                
                term = new RateEngineJSON.Terminal();
                term.SFID = c.Destination.SFID;
                term.Distance = c.Destination.Distance;
                term.Name = c.Destination.Name;
                term.Cost = c.Destination.Cost;
                term.AdminFee = c.Destination.AdminFee;
                rate.Destination = term;
                
                rate.Distance = c.Distance;
                if (c.RateBreakdown != null) {
                    for (rateengineWSDL.RateBreakdown rb :c.RateBreakdown.RateBreakdown) {
                        if (rb.Type_x == 'TRANSIT_COST') {
                            rate.Cost = Convert.toDouble(rb.Value,0);
                        }
                    }
                }
                
                rej.Rates.Add(rate);
            }
            
            RateEngineJSON.Request rjr = new RateEngineJSON.Request();
            
            RateEngineJSON.Address a = new RateEngineJSON.Address();
            a.Address = resp.Request.Origin.Address;
            a.City = resp.Request.Origin.City;
            a.State = resp.Request.Origin.State;
            a.Zip = resp.Request.Origin.Zip;
            rjr.Origin = a;
            
            a = new RateEngineJSON.Address();
            a.Address = resp.Request.Destination.Address;
            a.City = resp.Request.Destination.City;
            a.State = resp.Request.Destination.State;
            a.Zip = resp.Request.Destination.Zip;
            rjr.Destination = a;
            
            rjr.PickupDate = resp.Request.PickupDate;
            
            RateEngineJSON.Vehicle rv = new RateEngineJSON.Vehicle();
            rv.Year = resp.Request.Vehicle.Year;
            rv.Make = resp.Request.Vehicle.Make;
            rv.Model = resp.Request.Vehicle.Model;
            rjr.Vehicle = rv;
            
            rej.Request = rjr;
            rej.QuoteId = this.Qte.Name;
            GetQuoteRateEngine(rej);
        }
    }
    
    
    public void CalculateOld() {
        
        if (string.isBlank(this.Error)) {
            try {
                Origin.GetCity();
                Destination.GetCity();
            } catch (Exception ex) { 
                this.Log(this.NoteExternal);
                this.Log(ex);
                this.Error = 'Problem Retrieving City: ' + ex.getMessage();
            }
        }
        
        //pu date
        this.Input.PickupDate = this.Pickup;
        
        //calc the transit cost
        this.CalcTransitCost();            
        
        this.addition_markup = 0;
        if (string.isBlank(this.Error)) {
            try {
                //set miles type since the miles are not passed in
                this.Input.DistanceCalcType = 'google';
                
                //calc
                this.Output = CAN_Cost.GetCost(this.Input);
                
                if (this.DestinationTerminal.Acct.ShippingState == 'WA' || this.DestinationTerminal.Acct.ShippingState == 'OR') {
                    if (this.IsConsumer) {
                            addition_markup += 50;
                    }
                    output.Price += 50;
                }
                
                //get direct costs
                CAN_Cost.CANCostInputModel ccInput = new CAN_Cost.CANCostInputModel();
                ccInput.Origin = new CAN_Cost.CANCostAddress();
                ccInput.Origin.Street = this.Origin.Street;
                ccInput.Origin.City = this.Origin.City;
                ccInput.Origin.State = this.Origin.State;
                ccInput.Origin.PostalCode = this.Origin.Zip;
                ccInput.Destination = new CAN_Cost.CANCostAddress();
                ccInput.Destination.Street = this.Destination.Street;
                ccInput.Destination.City = this.Destination.City;
                ccInput.Destination.State = this.Destination.State;
                ccInput.Destination.PostalCode = this.Destination.Zip;
                ccInput.DistanceCalcType = 'google';
                ccInput.PickupDate = this.Pickup;
                CAN_Cost.CANCostOutputModel ccOutput = CAN_Cost.GetCost(ccInput);
                this.CC = 
                    ccOutput.Price + 
					this.VehicleCost + 
                    20 + 
                    20 + 
                    addition_markup +
                    markup_transit + 
                    markup_door + 
                    markup_door -
                    this.TransitLoad.SBQQ__AdditionalDiscountAmount__c;
                
                if (this.OriginTerminal.Acct.Id == '0014600000j7j13') { //origin direct
                    addition_markup += 20;
                }
                if (this.DestinationTerminal.Acct.Id == '0014600000j7j1D') { //destination direct
                    addition_markup += 20;
                }
                
                //check to be sure the door fees are there
                if (this.Output.Price > 0 && string.isBlank(this.Error)) {
                    if ((this.OriginTerminal.DoorFee > 0 
                        || this.ServiceType == SERVICE_TYPE_CarrierDirect
                        || this.ServiceType == SERVICE_TYPE_OriginDirect)
                        && (this.DestinationTerminal.DoorFee > 0 
                            || this.ServiceType == SERVICE_TYPE_DestinationDirect
                            || this.ServiceType == SERVICE_TYPE_CarrierDirect)) {
                        this.DD = 
                            this.Output.Price + 
                            this.VehicleCost + 
                            this.OriginTerminal.DoorFee + 
                            this.DestinationTerminal.DoorFee + 
                            addition_markup +
                            markup_transit + 
                            markup_door + 
                            markup_door -
                            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c;
                        this.TT = 
                            this.Output.Price + 
                            this.VehicleCost + 
                            this.OriginTerminal.AdminFee + 
                            this.DestinationTerminal.AdminFee + 
                            addition_markup +
                            markup_transit + 
                            markup_door + 
                            markup_door - 
                            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c;
                        this.TD = 
                            this.Output.Price + 
                            this.VehicleCost + 
                            this.OriginTerminal.AdminFee + 
                            this.DestinationTerminal.DoorFee +
                            addition_markup +
                            markup_transit + 
                            markup_door + 
                            markup_door - 
                            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c;
                        this.DT = 
                            this.Output.Price + 
                            this.VehicleCost + 
                            this.OriginTerminal.DoorFee + 
                            this.DestinationTerminal.AdminFee + 
                            addition_markup +
                            markup_transit + 
                            markup_door + 
                            markup_door - 
                            this.TransitLoad.SBQQ__AdditionalDiscountAmount__c;
                    } else {
                        this.Error += 'Invalid Terminal(s)';
                    }
                } else {
                    this.Error = 'Invalid Terminal(s)';
                    this.DD = 0;
                    this.TT = 0;
                    this.TD = 0;
                    this.DT = 0;
                }
            } catch (Exception ex) { 
                this.Log(this.NoteExternal);
                this.Log(ex);
                this.Error = 'Problem Calculating Terminal to Termianl Rate: ' + ex.getMessage();
            }
        }
        
        if (this.Output == null) {
            this.Output = new CAN_Cost.CANCostOutputModel();
            this.Output.Dist = -1;
            this.Output.Price = -1;
        }
        
        if (this.Output.Dist == null) { this.Output.Dist = -1; }
        if (this.Output.Price == null) { this.Output.Price = -1; }
        
        //this.NoteExternal += '\n\rWeb Advantage: ' + CONVERT.toString(this.TT,'Error');
        //this.NoteExternal += '\n\rWeb Premium: ' + CONVERT.toString(this.DD,'Error');
        
        
        
    }
        
    private void SaveQuote()
    {
        //clear out web quote data for phone quote
        if (!this.IsWeb) {
            this.NoteExternal = '';
        }
        
        //append all quote options
        if (this.IsNew) {
            
            this.NoteExternal += 
                '\n********' +
                '\nDate Time: ' + CONVERT.toString(datetime.now().format(),'Error') +
                this.NoteNew;
        } else {
            this.NoteExternal += 
                '\n**************************************************' +
                '\nDate Time: ' + CONVERT.toString(datetime.now().format(),'Error') +
                '\nOrigin: ' + this.OriginTerminal.Acct.Name +
                '\nDestination: ' + this.DestinationTerminal.Acct.Name ;
            
            if (this.IsConsumer && this.ServiceType == SERVICE_TYPE_TerminalService) {
                this.NoteExternal += 
                '\nOption 1 is Door to Door: ' + CONVERT.toString(this.DD,'Error') +
                '\nOption 2 is Terminal to Terminal: ' + CONVERT.toString(this.TT,'Error') +
                '\nOption 3 is Terminal to Door: ' + CONVERT.toString(this.TD,'Error') +
                '\nOption 4 is Door to Terminal: ' + CONVERT.toString(this.DT,'Error') +
                '\nOption 5 is Carrier Direct: ' + CONVERT.toString(this.CC,'Error');
            }
        }
        
        if (!this.IsWeb) {  //can't append a null string
            this.NoteExternal += 
                '\n--------' +
                '\n' + CONVERT.toString(this.Qte.SBQQ__Notes__c,'');
        }
        
        //insert the contact if web
        if (this.IsWeb) {
            //insert primary contact
            Contact pri = new Contact( 
                FirstName = 'Primary',
                LastName = 'Contact',
                BillingAccount_Account__c = Quote_Defaults_Settings__c.getInstance().Account_Billing_Consumer_Id__c,
                AccountId = Quote_Defaults_Settings__c.getInstance().Account_OrderContact__c,
                OrderCampaign_Campaign__c = Quote_Defaults_Settings__c.getInstance().Campaign_Consumer_InstantQuote_Id__c,
                MailingCity = this.Origin.City,
                MailingCountry = this.Origin.Country,
                MailingPostalCode = this.Origin.Zip.leftPad(5,'0'),
                MailingState  = this.Origin.State,
                MailingStreet  = this.Origin.Street,
                OtherCity = this.Destination.City,
                OtherCountry = this.Destination.Country,
                OtherPostalCode = this.Destination.Zip.leftPad(5,'0'),
                OtherState  = this.Destination.State,
                OtherStreet  = this.Destination.Street,
                Campaign__c = 'Instant Quotes Consumer',
                Type__c = 'Transferee',
                QuoteType__c = 'Consumer Quote',
                RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('CAN Order Contacts').getRecordTypeId(),
                Move_Date__c = input.PickupDate);
            insert pri; 
            
            SBQQ__Quote__c tempQ = this.Qte;
            
            this.Qte = [select Id, SBQQ__NetAmount__c, Name, SBQQ__Notes__c, Origin_Contact__c, Destination_Contact__c, SBQQ__PrimaryContact__c, SBQQ__StartDate__c, SBQQ__Account__r.pServiceType__c, SBQQ__Account__r.Type
                        from SBQQ__Quote__c
                        where SBQQ__PrimaryContact__c = :pri.id
                        order by name desc
                        limit 1];
                
            
            //this.Qte = new SBQQ__Quote__c();
            this.IsConsumer = true;
            this.Qte.SBQQ__Type__c = 'Consumer Quote';
            this.Qte.SBQQ__Account__c = '0014600000j8DxBAAU';
            this.Qte.CPQ_Process__c = 'Quote_Created';
            this.Qte.SBQQ__Status__c = 'Draft';
            this.Qte.SBQQ__PriceBook__c = '01s46000003g4JX';
            this.Qte.SBQQ__PricebookId__c = '01s46000003g4JX';
            
            this.Qte.Origin_Terminal__c = tempQ.Origin_Terminal__c;
            this.Qte.Origin_Door_Miles__c = tempQ.Origin_Door_Miles__c;
            this.Qte.Destination_Terminal__c = tempQ.Destination_Terminal__c;
            this.Qte.Destination_Door_Miles__c = tempQ.Destination_Door_Miles__c;
        }
        
        
        //update the quote
        if (string.isBlank(this.Error)) {
            try {
                this.Qte.rCAN_Difficulty__c = output.CAN_Difficulty_Id;
                this.Qte.nTransitDifficulty__c = output.CAN_Difficulty_Number;
            } catch (Exception ex) {  this.Log(ex); }
            
            
            //add quote variables
            this.Qte.Transit_Miles__c = this.Output.Dist;
            this.Qte.Route_Miles__c = this.GetRouteMiles();
            //this.Qte.SBQQ__StartDate__c = input.PickupDate;
            this.Qte.SBQQ__Notes__c = this.NoteExternal;
            this.Qte.CPU_Cost__c = this.DestinationTerminal.AdminFee; //* CPU Cost (Currency)
            this.Qte.CDO_Cost__c = this.OriginTerminal.AdminFee; //* CDO Cost (Currency)
            this.Qte.TPU_Cost__c = this.OriginTerminal.DoorFee; //* TPU Cost (Currency)
            this.Qte.TDO_Cost__c = this.DestinationTerminal.DoorFee; //* TDO Cost (Currency)
            this.Qte.Terminal_to_Terminal_Cost__c = output.Price; //* Terminal to Terminal Cost (Currency)
            this.Qte.Terminal_to_Terminal_Price__c = this.TT;
            this.Qte.Door_to_Door_Cost__c = this.DD;
            this.Qte.Terminal_to_Door_Cost__c = this.TD;
            this.Qte.Door_to_Terminal_Cost__c = this.DT;
        } else {
            //update the note
            this.Qte.SBQQ__Notes__c = 
                '\n\rError: ' + this.Error + 
                '\n\r--------------------------------------------------' +
                '\n\r' + CONVERT.toString(this.Qte.SBQQ__Notes__c,'');
        }
        
        //set the recacl option
        this.Qte.chRecalculateQuote__c = false;
        
        //check notes length, length cannot exceed 2000
        if (this.Qte.SBQQ__Notes__c.Length() > 2000) {
            this.Qte.SBQQ__Notes__c = this.Qte.SBQQ__Notes__c.substring(0,1999);
        }

        upsert this.Qte;
        
        //if (this.IsWeb) {
        //  this.Qte = [select Id, SBQQ__NetAmount__c, Name, SBQQ__Notes__c, Origin_Contact__c, Destination_Contact__c, SBQQ__PrimaryContact__c, SBQQ__StartDate__c from SBQQ__Quote__c where Id = :this.Qte.Id];
        //}

        if (string.isBlank(this.Error)) {
            //insert quote line items
            this.QuoteLines = new List<SBQQ__QuoteLine__c>();

            //vehicle relocation
            if (this.VehicleRelocation.SBQQ__Quote__c == null) { this.VehicleRelocation.SBQQ__Quote__c = this.Qte.Id; }
            this.VehicleRelocation.SBQQ__Product__c = product_vehicle_relocation.id;
            this.VehicleRelocation.SBQQ__Quantity__c = 1;
            this.VehicleRelocation.SBQQ__ListPrice__c = 0;
            this.VehicleRelocation.SBQQ__NetPrice__c = 0;
            this.VehicleRelocation.SBQQ__Number__c = 1;
            this.VehicleRelocation.SBQQ__UnitCost__c = 0;
            this.VehicleRelocation.SBQQ__Description__c = product_vehicle_relocation.Description;
            this.VehicleRelocation.SBQQ__Bundle__c = !this.IsConsumer;
            this.VehicleRelocation.SBQQ__PricingMethod__c = (this.IsConsumer ? null : 'Block');

            if (this.VehicleRelocation.Id == null) {      
                insert this.VehicleRelocation;
            }
            
            //add the cost
            //Transit Load
            //get the load type
            
            string load_type = 'Terminal to Terminal';
            if (this.ServiceType == SERVICE_TYPE_CarrierDirect) { 
                load_type = 'Door to Door'; 
            } else if (this.ServiceType == SERVICE_TYPE_DestinationDirect) { 
                load_type = 'Terminal to Door'; 
            } else if (this.ServiceType == SERVICE_TYPE_OriginDirect) { 
                load_type = 'Door to Terminal'; 
            }
            
            decimal price = (this.IsConsumer ? (output.Price + markup_transit + addition_markup) : 0);
            decimal cost = output.Price;
            decimal markup = (markup_transit + addition_markup);
            
            if (this.IsNew) {
                try {
                    cost = this.TransitCost;
                	markup = price - cost;
                } catch (Exception ex) {
                    
                }
            }

            if (this.TransitLoad.SBQQ__Quote__c == null) { this.TransitLoad.SBQQ__Quote__c = this.Qte.Id; }
            this.TransitLoad.SBQQ__Product__c = product_transit_load.id;
            this.TransitLoad.SBQQ__Quantity__c = 1; 
            this.TransitLoad.SBQQ__ListPrice__c = price;
            this.TransitLoad.SBQQ__NetPrice__c = price;
            this.TransitLoad.SBQQ__UnitCost__c = cost;
            this.TransitLoad.SBQQ__MarkupAmount__c = markup;
            this.TransitLoad.SBQQ__Number__c = 4;
            this.TransitLoad.Load_Type__c = load_type;
            this.TransitLoad.SBQQ__Description__c = product_transit_load.Description;
            this.TransitLoad.SBQQ__ProductOption__c = product_option_transit_load.id;
            this.TransitLoad.SBQQ__RequiredBy__c = this.VehicleRelocation.Id;
            this.TransitLoad.miles__c = this.Qte.Transit_Miles__c;
            this.QuoteLines.add(this.TransitLoad);
  

            if (this.IsNew) {
                this.VehicleCost = 0;
                this.VehicleCostModifier = 0;
            }
            if (this.VehicleClassQL.SBQQ__Quote__c == null) 
            {
                 this.VehicleClassQL.SBQQ__Quote__c = this.Qte.Id; 
            }

            this.VehicleClassQL.SBQQ__Product__c = product_vehicle_class.id;
            this.VehicleClassQL.SBQQ__Quantity__c = 1;
            this.VehicleClassQL.SBQQ__ListPrice__c = (this.IsConsumer ? this.VehicleCost : 0);
            this.VehicleClassQL.SBQQ__NetPrice__c = (this.IsConsumer ? this.VehicleCost : 0);
            this.VehicleClassQL.SBQQ__UnitCost__c = (output.Price * this.VehicleCostModifier);
            this.VehicleClassQL.SBQQ__MarkupAmount__c = 0;
            this.VehicleClassQL.Vehicle_Class__c = this.VehicleClass;
            this.VehicleClassQL.Vehicle__c = this.VehicleId;
            this.VehicleClassQL.SBQQ__Number__c = 2;
            this.VehicleClassQL.SBQQ__Description__c = product_vehicle_class.Description;
            this.VehicleClassQL.SBQQ__ProductOption__c = product_option_vehicle_class.id;
            this.VehicleClassQL.SBQQ__RequiredBy__c = this.VehicleRelocation.Id;
            this.QuoteLines.add(this.VehicleClassQL);
            
            //add origin fee
            decimal door_fee = (this.OriginTerminal.AdminFee + markup_door);
            decimal admin_fee = this.OriginTerminal.AdminFee;
            load_type = 'Customer Drop Off';
            if (this.ServiceType == SERVICE_TYPE_CarrierDirect
                || this.ServiceType == SERVICE_TYPE_OriginDirect) {
                door_fee = 0;
                admin_fee = 0;
                load_type = 'Carrier Pickup';
            }  else {
                if (!this.IsConsumer) {
                    door_fee = 0; //this.OriginTerminal.DoorFee;
                    admin_fee = this.OriginTerminal.DoorFee;
                    load_type = 'Terminal Pickup';
                }
            }
    
            if (this.OriginLoad.SBQQ__Quote__c == null) { this.OriginLoad.SBQQ__Quote__c = this.Qte.Id; }
            this.OriginLoad.SBQQ__Product__c = product_origin_load.id;
            this.OriginLoad.SBQQ__ListPrice__c = door_fee;
            this.OriginLoad.SBQQ__NetPrice__c = door_fee;
            this.OriginLoad.SBQQ__MarkupAmount__c = markup_door;
            this.OriginLoad.SBQQ__Quantity__c = 1;
            this.OriginLoad.SBQQ__Number__c = 3;
            if (this.OriginLoad.Id == null) { this.OriginLoad.Load_Type__c = load_type; }
            this.OriginLoad.SBQQ__Description__c = product_origin_load.Description;
            this.OriginLoad.SBQQ__ProductOption__c = product_option_origin_load.id;
            this.OriginLoad.SBQQ__RequiredBy__c = this.VehicleRelocation.Id;
            this.OriginLoad.SBQQ__UnitCost__c = admin_fee;
            this.OriginLoad.transporterAccount__c = this.Qte.Origin_Terminal__c;
            this.OriginLoad.miles__c = this.Qte.Origin_Door_Miles__c;
            this.QuoteLines.add(this.OriginLoad);   
            
            
            //public static string SERVICE_TYPE_DestinationDirect = 'Destination Direct';
            //public static string SERVICE_TYPE_TerminalService = 'Terminal Service';
            //public static string SERVICE_TYPE_CarrierDirect = 'Carrier Direct';
            //public static string SERVICE_TYPE_OriginDirect = 'Origin Direct';
            //add destination fee
          
            door_fee = (this.DestinationTerminal.AdminFee + markup_door);
            admin_fee = this.DestinationTerminal.AdminFee;
            load_type = 'Customer Pickup';
            if (this.ServiceType == SERVICE_TYPE_CarrierDirect
                || this.ServiceType == SERVICE_TYPE_DestinationDirect) {
                door_fee = 0;
                admin_fee = 0;
                load_type = 'Carrier Drop Off';
            } else {
                if (!this.IsConsumer) {
                    door_fee = 0; //this.DestinationTerminal.DoorFee;
                    admin_fee = this.DestinationTerminal.DoorFee;
                    load_type = 'Terminal Drop Off';
                }
            }
            
            if (this.DestinationLoad.SBQQ__Quote__c == null) { this.DestinationLoad.SBQQ__Quote__c = this.Qte.Id; }
            if (this.DestinationLoad.Id == null) { this.DestinationLoad.Load_Type__c = load_type; }
            this.DestinationLoad.SBQQ__Product__c = product_destination_load.id;
            this.DestinationLoad.SBQQ__ListPrice__c = door_fee;
            this.DestinationLoad.SBQQ__NetPrice__c = door_fee;
            this.DestinationLoad.SBQQ__MarkupAmount__c = markup_door;
            this.DestinationLoad.SBQQ__Quantity__c = 1;
            this.DestinationLoad.SBQQ__Number__c = 5;
            this.DestinationLoad.SBQQ__Description__c = product_destination_load.Description;
            this.DestinationLoad.SBQQ__ProductOption__c = product_option_destination_load.id;
            this.DestinationLoad.SBQQ__RequiredBy__c = this.VehicleRelocation.Id;
            this.DestinationLoad.SBQQ__UnitCost__c = admin_fee;
            this.DestinationLoad.transporterAccount__c = this.Qte.Destination_Terminal__c;
            this.DestinationLoad.miles__c = this.Qte.Destination_Door_Miles__c;
            
            this.QuoteLines.add(this.DestinationLoad);  
            
            if (!this.IsConsumer) {
                //fuel surcharge
                if (this.FuelSurcharge.SBQQ__Quote__c == null) { this.FuelSurcharge.SBQQ__Quote__c = this.Qte.Id; }
                this.FuelSurcharge.SBQQ__Product__c = product_fuel_surcharge.id;
                this.FuelSurcharge.SBQQ__Quantity__c = 1;
                this.FuelSurcharge.SBQQ__ListPrice__c = 0;
                this.FuelSurcharge.SBQQ__NetPrice__c = 0;
                this.FuelSurcharge.SBQQ__Number__c = 6;
                this.FuelSurcharge.SBQQ__UnitCost__c = 0;
                this.FuelSurcharge.SBQQ__Description__c = product_fuel_surcharge.Description;
                this.FuelSurcharge.SBQQ__ProductOption__c = product_option_fuel_surcharge.id;
                this.FuelSurcharge.SBQQ__RequiredBy__c = this.VehicleRelocation.Id;
                this.QuoteLines.add(this.FuelSurcharge);    
            }
            else {
                if (this.FuelSurcharge.SBQQ__Quote__c != null) {
                    delete this.FuelSurcharge;
                }
            }
            
            upsert this.QuoteLines; 
        }
        
        if (this.IsWeb && string.isBlank(this.Error)) {
            //update the contacts
            this.Contacts = [select Id,Email,MailingStreet,MailingCity,MailingState,MailingPostalCode,
                             		pServiceType__c,LeadSource,Phone,OtherPhone,FirstName,LastName,Mailing_Address_Notes__c 
                             from Contact 
                             where Id in (:this.Qte.Origin_Contact__c,:this.Qte.SBQQ__PrimaryContact__c,:this.Qte.Destination_Contact__c)];
            
            for(integer i = 0; i < this.Contacts.Size(); i++) {
                if (this.Contacts[i].Id == this.Qte.Origin_Contact__c) {
                    this.Contacts[i].MailingStreet = Origin.Street;
                    this.Contacts[i].MailingCity = Origin.City;
                    this.Contacts[i].MailingState = Origin.State;
                    this.Contacts[i].MailingPostalCode = Origin.Zip.leftPad(5,'0');
                } else if (this.Contacts[i].Id == this.Qte.Destination_Contact__c) {
                    this.Contacts[i].MailingStreet = Destination.Street;
                    this.Contacts[i].MailingCity = Destination.City;
                    this.Contacts[i].MailingState = Destination.State;
                    this.Contacts[i].MailingPostalCode = Destination.Zip.leftPad(5,'0');
                } else if (this.Contacts[i].Id == this.Qte.SBQQ__PrimaryContact__c) {
                    
                    this.Contacts[i].FirstName = this.PrimaryContact_FirstName;
                    this.Contacts[i].LastName = this.PrimaryContact_LastName;
                    this.Contacts[i].Phone = this.PrimaryContact_Phone;
                    this.Contacts[i].OtherPhone = this.PrimaryContact_PhoneSecondary;
                    this.Contacts[i].Mailing_Address_Notes__c = this.PrimaryContact_BestTimeToCall;
                    this.Contacts[i].Email = this.Email;
                    
                    if (!string.isBlank(this.VehicleId)) {
                        this.Contacts[i].Vehicle_Name__c = this.VehicleId;
                        this.Contacts[i].LeadSource = this.Affiliate;
                    }
                }
            }
            
            update this.Contacts;
        
            
            string dd_price = 'Please Enter Full Address';
            if (!string.isblank(this.Origin.Street) && !string.isblank(this.Destination.Street)) {
                dd_price = '$ ' + this.DD.format();
            }
            
            SendEmail(
                this.Email, 
                this.Qte.Name, 
                this.CC,
                this.DD,
                this.TT,
                this.TD,
                this.DT,
                (string.IsBlank(this.VehicleName) ? this.VehicleClass : this.VehicleName), 
                (!string.isblank(this.Origin.Street) ? this.Origin.Street + '<br />'  : '' ) +
                this.Origin.City + ', ' + this.Origin.State, 
                (!string.isblank(this.Destination.Street) ? this.Destination.Street + '<br />'  : '' ) +
                this.Destination.City + ', ' + this.Destination.State, 
                this.Pickup,
                this.Qte.SBQQ__PrimaryContact__c,
                this.Qte.Id,
                this.Affiliate
                );
        }

        if (this.IsWeb) {  //do this even if there is an error
            //set up the response
            this.QR = new QuoteResponse();
            this.QR.QuoteId = this.Qte.Name;
            this.QR.Advantage = this.TT;
            this.QR.Standard = this.TT;
            this.QR.Premium = this.DD;
            this.QR.DD = this.DD;
            this.QR.TT = this.TT;
            this.QR.TD = this.TD;
            this.QR.DT = this.DT;
            this.QR.CC = this.CC;
            this.QR.Quoteable = string.isBlank(this.Error);
            this.QR.Error = this.Error;
        }
    }
    
    private void BuildProducts() {
        //get corp products
        //update load types
        List<Product2> products = null;
        if (this.IsConsumer) { 
            products = [select Id, Name, Description from Product2 where ProductCode like 'CONS-%'];
        } else {
            products = [select Id, Name, Description from Product2 where ProductCode like 'CORP-%'];
        }
        
        for (Product2 pl :products) {
            if (pl.Name == 'Transit Load') { product_transit_load = pl; }
            if (pl.Name == 'Vehicle Class') { product_vehicle_class = pl; }
            if (pl.Name == 'Origin Load') { product_origin_load = pl; }
            if (pl.Name == 'Destination Load') { product_destination_load = pl; }
            if (pl.Name == 'Vehicle Relocation') { product_vehicle_relocation = pl; }
            if (pl.Name == 'Fuel Surcharge') { product_fuel_surcharge = pl; }
        }
        
        //get the product options
        List<SBQQ__ProductOption__c> product_options = 
            [select Id, Name, SBQQ__ConfiguredSKU__c, SBQQ__OptionalSKU__c
             from SBQQ__ProductOption__c 
             where SBQQ__ConfiguredSKU__c = :product_vehicle_relocation.id];
             
        for (SBQQ__ProductOption__c pl :product_options) {
            if (pl.SBQQ__OptionalSKU__c == product_transit_load.id) { product_option_transit_load = pl; }
            if (pl.SBQQ__OptionalSKU__c == product_vehicle_class.id) { product_option_vehicle_class = pl; }
            if (pl.SBQQ__OptionalSKU__c == product_origin_load.id) { product_option_origin_load = pl; }
            if (pl.SBQQ__OptionalSKU__c == product_destination_load.id) { product_option_destination_load = pl; }
            if (pl.SBQQ__OptionalSKU__c == product_vehicle_relocation.id) { product_option_vehicle_relocation = pl; }
            if (!this.IsConsumer && pl.SBQQ__OptionalSKU__c == product_fuel_surcharge.id) { product_option_fuel_surcharge = pl; }
        }
    }
    
    private decimal GetRouteMiles() {
        decimal rv = 0;
        
        if (!this.IsConsumer) {
            if (this.ServiceType == SERVICE_TYPE_CarrierDirect) {
                rv = this.Output.Dist;
            } else {
                MileMaker route_dist = FindCity.GetDistaince(this.Origin, this.Destination, 'google');
                rv = route_dist.Distance;
            }
        }

        return rv;
    }
    
    
    private void CalcTransitCost() {
        if (this.ServiceType == SERVICE_TYPE_CarrierDirect) {
            this.OriginTerminal = this.Origin.GetDirectTerminal(true);
            this.DestinationTerminal = this.Destination.GetDirectTerminal(false);
        } else if (this.ServiceType == SERVICE_TYPE_DestinationDirect) {
            this.OriginTerminal = this.Origin.GetClosestTerminal('google');
            this.DestinationTerminal = this.Destination.GetDirectTerminal(false);
        } else if (this.ServiceType == SERVICE_TYPE_OriginDirect) {
            this.OriginTerminal = this.Origin.GetDirectTerminal(true);
            this.DestinationTerminal = this.Destination.GetClosestTerminal('google');
        } else {
            this.OriginTerminal = this.GetTerminal(true);
            this.DestinationTerminal = this.GetTerminal(false);
        }

        //get the terminals
        this.AssignOriginDestination(true);
        this.AssignOriginDestination(false);
        
    }
    
    private FindCity.Terminal GetTerminal(boolean orig) {
        FindCity.Terminal rv;
        if (orig) {
            if (this.Qte.LockOrigin__c && this.Qte.Origin_Terminal__c != null) {
                rv = this.Origin.GetTerminal(this.Qte.Origin_Terminal__c);
            } else {
                rv = this.Origin.GetClosestTerminal('google');
            }
        } else {
            if (this.Qte.LockDestination__c && this.Qte.Destination_Terminal__c != null) {
                rv = this.Destination.GetTerminal(this.Qte.Destination_Terminal__c);
            } else {
                rv = this.Destination.GetClosestTerminal('google');
            }
        }
        return rv;   
    }
    
    
    private void AssignOriginDestination(boolean orig) {
        if (string.isBlank(this.Error)) {
            Account terminal_acct = null;
            try {
                if (orig) {
                    //CarrierDirect
                    //TerminalService
                    //DestinationDirect
                    this.Qte.Origin_Terminal__c = this.OriginTerminal.Acct.Id;
                    this.Qte.Origin_Door_Miles__c = this.OriginTerminal.Dist;
                    this.NoteExternal += '\n\rOrigin Door Miles: ' + CONVERT.toString(this.OriginTerminal.Dist,'');
                    //MAKE SURE THERE ARE NO UPDATES BEFORE THE DISTANCE IS CALCULATED
                    //SALESFORCE DOES NOT ALLOW CALLOUTS AFTER UPDATES
                    
                    //origin
                    input.Origin = new CAN_Cost.CANCostAddress();
                    input.Origin.setTerminalAccount(this.OriginTerminal.Acct);
                } 
                else {
                    this.Qte.Destination_Terminal__c = this.DestinationTerminal.Acct.Id;
                    this.Qte.Destination_Door_Miles__c = this.DestinationTerminal.Dist;
                    this.NoteExternal += '\n\rDestination Door Miles: ' + CONVERT.toString(this.DestinationTerminal.Dist,'');
                    
                    //destination
                    input.Destination = new CAN_Cost.CANCostAddress();
                    input.Destination.setTerminalAccount(this.DestinationTerminal.Acct);
                }
            } catch (Exception ex) { 
                this.Log(this.NoteExternal);
                this.Log(ex);
                this.Error = 'Problem Finding Terminals ' + (orig ? 'Origin' : 'Destination' ) + ': ' + ex.getMessage();
            }
        
            if (this.OriginTerminal == null) {
                this.OriginTerminal = FindCity.GetDefaultTerminal();
            }
        }
    }
    
    
    public string GetQuoteRateEngine() {
        string jj = CONVERT.toString(ApexPages.currentPage().getParameters().get('json'),'');
        if (jj == '') {
            this.Error = 'Invalid JSON';
        }
        RateEngineJSON r = (RateEngineJSON)JSON.deserialize(jj,RateEngineJSON.class);
        
        //load from quote
        this.IsNew = true;
        this.IsWeb = true;
        this.IsConsumer = true;
        this.BuildProducts();
        this.Qte = new SBQQ__Quote__c();
        this.Qte.LockOrigin__c = false;
        this.Qte.LockDestination__c = false;
        this.markup_transit = 0;
        this.markup_door = 0;
        this.ServiceType = SERVICE_TYPE_TerminalService;
        
        if (string.isNotBlank(r.QuoteId)) {
            //find quote id
            string qid = [select id from SBQQ__Quote__c where name = :r.QuoteId limit 1].id;
            this.LoadFromQuote(qid);
        }
        
        GetQuoteRateEngine(r);
        this.SaveQuote();
        return JSON.serialize(this.QR);
    }
    
    public string GetQuoteRateEngine(RateEngineJSON r) {
        this.markup_transit = 0;
        this.markup_door = 0;
        
        //update the demographics
        this.Output = new CAN_Cost.CANCostOutputModel();
        this.Output.CAN_Difficulty_Number = 0;
        this.Output.CAN_Difficulty_Id = null;
        RateEngineJSON.Request req = r.Request;
        this.Pickup = ((req.PickupDate == null) ? Date.Today() : req.PickupDate.Date());
        
        RateEngineJSON.Address a = req.Origin;
        this.Origin = new FindCity();
        this.Origin.Street = a.Address;
        this.Origin.City = a.City;
        this.Origin.State = a.State;
        this.Origin.Zip = a.Zip;
        this.Origin.Latitude = a.Latitude;
        this.Origin.Longitude = a.Longitude;
        this.Origin.Country = 'United States';
        
        a = req.Destination;
        this.Destination = new FindCity();
        this.Destination.Street = a.Address;
        this.Destination.City = a.City;
        this.Destination.State = a.State;
        this.Destination.Zip = a.Zip;
        this.Destination.Latitude = a.Latitude;
        this.Destination.Longitude = a.Longitude;
        this.Destination.Country = 'United States';
        
        RateEngineJSON.Vehicle v = req.Vehicle;
        List<Vehicle__c> vehs = 
            [select Id, fdPrice__c, fsClass__c, fpCostModifier__c, Name
             from Vehicle__c 
             where Year__c = :CONVERT.ToString(v.Year,'')
             	and Make__c = :v.Make
             	and Model__c = :v.Model
             order by OV_Sort__c
             limit 1];
        
        if (vehs.size() < 1) {
            this.VehicleName = '2012 Generic Standard Size';
            this.TranslateVehicle();
        }
        else {
            this.VehicleName = vehs[0].Name;
            this.VehicleCost = vehs[0].fdPrice__c;
            this.VehicleCostModifier = (vehs[0].fpCostModifier__c / 100.0);
            this.VehicleClass = vehs[0].fsClass__c;
            this.VehicleId = vehs[0].Id;
        }
        
        //primary contact
		RateEngineJSON.PrimaryContact pc = req.PrimaryContact;
        if (pc == null) { pc = new RateEngineJSON.PrimaryContact(); }
        this.PrimaryContact_FirstName = (pc.FirstName != null ? pc.FirstName : 'Primary');
    	this.PrimaryContact_LastName = (pc.LastName != null ? pc.LastName : 'Contact');
    	this.PrimaryContact_Email = pc.Email;
        this.Email = pc.Email;
    	this.PrimaryContact_Phone = pc.Phone;
    	this.PrimaryContact_PhoneSecondary = pc.PhoneSecondary;
    	this.PrimaryContact_BestTimeToCall = pc.BestTimeToCall;
        
        //input
        this.Input.PickupDate = date.newinstance(req.PickupDate.year(), req.PickupDate.month(), req.PickupDate.day());
        
        //build rates
        //<s:enumeration value="CARRIER_DIRECT"/>
        //<s:enumeration value="DOOR_TO_DOOR"/>
        //<s:enumeration value="TERMINAL_TO_DOOR"/>
        //<s:enumeration value="DOOR_TO_TERMINAL"/>
        //<s:enumeration value="TERMINAL_TO_TERMINAL"/>
        string ot = '';
        string dt = '';
        string amt = '';
        string mt = '';
        
        
        for (RateEngineJSON.Rates rr :r.Rates) {
            ot = rr.Origin.Name;
            dt = rr.Destination.Name;
            amt = CONVERT.toString(rr.Amount,'Error');
            
            if (rr.RateType == 0) { //<s:enumeration value="CARRIER_DIRECT"/>
                this.CC = rr.Amount;
                DootToDoorDist = rr.Distance;
                mt = 'Carrier Direct';
                if (this.OriginTerminal == null) {
                    this.OriginTerminal = TranslateTerminal(rr.Origin);
                    this.DestinationTerminal = TranslateTerminal(rr.Destination);
                    
                    this.Qte.Origin_Terminal__c = rr.Origin.SFID;
                    this.Qte.Origin_Door_Miles__c = rr.Origin.Distance;
                    this.Qte.Destination_Terminal__c = rr.Destination.SFID;
                    this.Qte.Destination_Door_Miles__c = rr.Destination.Distance;
                }
            } else if (rr.RateType == 1) { //<s:enumeration value="DOOR_TO_DOOR"/>
                
                this.DD = rr.Amount;
                this.OriginTerminal = TranslateTerminal(rr.Origin);
                this.DestinationTerminal = TranslateTerminal(rr.Destination);
                
                this.Qte.Origin_Terminal__c = rr.Origin.SFID;
                this.Qte.Origin_Door_Miles__c = rr.Origin.Distance;
                this.Qte.Destination_Terminal__c = rr.Destination.SFID;
                this.Qte.Destination_Door_Miles__c = rr.Destination.Distance;
                this.TransitCost = rr.Cost;
                mt = 'Door to Door';
                
            } else if (rr.RateType == 2) { //<s:enumeration value="TERMINAL_TO_DOOR"/>
                this.TD = rr.Amount;
                mt = 'Term to Door';
            } else if (rr.RateType == 3) {  //<s:enumeration value="DOOR_TO_TERMINAL"/>
                this.DT = rr.Amount;
                mt = 'Door to Term';
                
            } else if (rr.RateType == 4) { //<s:enumeration value="TERMINAL_TO_TERMINAL"/>
                this.TT = rr.Amount;
                Output.Dist = CONVERT.toInteger(rr.Distance, 0);
                Output.Price = (rr.Amount - rr.Origin.AdminFee - rr.Destination.AdminFee);
                mt = 'Term to Term';
            }
            
            this.NoteNew += '\n\n' +
                mt + ' ----> ' + amt + '\n' +
                ot + ' ::TO:: ' + dt;
        }
        
        return '';
    }
    
    public FindCity.Terminal TranslateTerminal(RateEngineJSON.Terminal tt) {
        FindCity.Terminal t = new FindCity.Terminal();
        t.Acct = new Account(Id=tt.SFID, Name = tt.Name);
        t.Dist = tt.Distance;
        t.AdminFee = tt.AdminFee;
        t.DoorFee = tt.Cost;
        return t;
    }
    
    
   
    public void TranslateVehicle() {
        //get the vehicle cost
        this.VehicleCost = 0;
        Vehicle__c v = null;
        boolean generic = true;
        
        if (string.isBlank(this.VehicleName)) {
            if (this.VehicleClass == 'Standard') {
                this.VehicleName = '2012 Generic Standard Size';
            } else if (this.VehicleClass == 'Oversized 1') {
                this.VehicleName = '2012 Generic Oversized Class 1';
            } else if (this.VehicleClass == 'Oversized 2') {
                this.VehicleName = '2012 Generic Oversized Class 2';
            } else if (this.VehicleClass == 'Oversized 3') {
                this.VehicleName = '2012 Generic Oversized Class 3';
            } else {
                this.VehicleName = 'Error';
                this.VehicleClass = 'Oversized 4';
                this.VehicleCostModifier = 3;
            }
        }
        else { generic = false; }
        
        if (string.isBlank(this.Error)) {
            v = [select Id, fdPrice__c, fsClass__c, fpCostModifier__c  from Vehicle__c where Year_Make_Model__c = :this.VehicleName Order By OV_Sort__c desc Limit 1];
            this.VehicleCost = v.fdPrice__c;
            this.VehicleCostModifier = (v.fpCostModifier__c / 100.0);
            this.VehicleClass = v.fsClass__c;
            //if not generic vehicle set the vehicle id on the quote
            if (!generic) { this.VehicleId = v.Id; }
        }
        
        
        //throw error for ov4
        if (this.VehicleClass == 'Oversized 4') {
            this.Error = 'Not Quoteable, Vehicle is OV4';
        }
    } 
    
    public string RetailQuoteCreate() {
        try {
            this.LoadFromGetParameters();
            this.Calculate();
        } catch (Exception ex) {
            string mess = 
                'QUOTE ERROR, PROBLEM WITH WEB QUOTE ON WEBSITE' +
                '\n\rEmail: ' + CONVERT.toString(this.Email,'') +
                '\n\rOrigin Street: ' + CONVERT.toString(this.Origin.Street,'') + 
                '\n\rOrigin City: ' + CONVERT.toString(this.Origin.City,'') + 
                '\n\rOrigin State: ' + CONVERT.toString(this.Origin.State,'') + 
                '\n\rOrigin Country: ' + CONVERT.toString(this.Origin.Country,'') +
                '\n\rDestination Street: ' + CONVERT.toString(this.Destination.Street,'') + 
                '\n\rDestination City: ' + CONVERT.toString(this.Destination.City,'') + 
                '\n\rDestination State: ' + CONVERT.toString(this.Destination.State,'') +
                '\n\rDestination Country: ' + CONVERT.toString(this.Destination.Country,'') +
                '\n\rPickup Date: ' + CONVERT.toString(this.Pickup,'') + 
                '\n\rVehicle Class: ' + CONVERT.toString(this.VehicleClass,'') + 
                '\n\rVehicle Name: ' + CONVERT.toString(this.VehicleName,'');
                
            //insert primary contact
            Contact pri = new Contact( 
                FirstName = 'Primary',
                LastName = 'Contact',
                BillingAccount_Account__c = Quote_Defaults_Settings__c.getInstance().Account_Billing_Consumer_Id__c,
                AccountId = Quote_Defaults_Settings__c.getInstance().Account_OrderContact__c,
                OrderCampaign_Campaign__c = Quote_Defaults_Settings__c.getInstance().Campaign_Consumer_InstantQuote_Id__c,
                MailingCity = this.Origin.City,
                MailingCountry = this.Origin.Country,
                MailingPostalCode = this.Origin.Zip.leftPad(5,'0'),
                MailingState  = this.Origin.State,
                MailingStreet  = this.Origin.Street,
                OtherCity = this.Destination.City,
                OtherCountry = this.Destination.Country,
                OtherPostalCode = this.Destination.Zip.leftPad(5,'0'),
                OtherState  = this.Destination.State,
                OtherStreet  = this.Destination.Street,
                Campaign__c = 'Instant Quotes Consumer',
                Type__c = 'Transferee',
                QuoteType__c = 'Consumer Quote',
                RecordTypeId =  Schema.SObjectType.Contact.getRecordTypeInfosByName().get('CAN Order Contacts').getRecordTypeId(),
                Move_Date__c = input.PickupDate);
            insert pri; 
            
            SBQQ__Quote__c tempQ = this.Qte;
            
            this.Qte = [select Id, SBQQ__NetAmount__c, Name, SBQQ__Notes__c, Origin_Contact__c, Destination_Contact__c, SBQQ__PrimaryContact__c, SBQQ__StartDate__c, SBQQ__Account__r.pServiceType__c, SBQQ__Account__r.Type
                        from SBQQ__Quote__c
                        where SBQQ__PrimaryContact__c = :pri.id
                        order by name desc
                        limit 1];
                
            
            //this.Qte = new SBQQ__Quote__c();
            this.IsConsumer = true;
            this.Qte.SBQQ__Type__c = 'Consumer Quote';
            this.Qte.SBQQ__Account__c = '0014600000j8DxBAAU';
            this.Qte.CPQ_Process__c = 'Quote_Created';
            this.Qte.SBQQ__Status__c = 'Draft';
            this.Qte.SBQQ__PriceBook__c = '01s46000003g4JX';
            this.Qte.SBQQ__PricebookId__c = '01s46000003g4JX';
            this.Qte.SBQQ__Notes__c = mess;
            
            //check notes length, length cannot exceed 2000
            if (this.Qte.SBQQ__Notes__c.Length() > 2000) {
                this.Qte.SBQQ__Notes__c = this.Qte.SBQQ__Notes__c.substring(0,1999);
            }
    
            upsert this.Qte;
            this.QR = new QuoteResponse();
            this.QR.QuoteId = this.Qte.Name;
            this.QR.Error = 'Cannt Quote, Please Contact Customer Service for a Quote';
        }
        return JSON.serialize(this.QR);
    }
    
    public string RetailQuoteUpdate(){
        this.QR = new QuoteResponse();
        this.QR.QuoteId = ApexPages.currentPage().getParameters().get('QuoteId');
        string FirstName = ApexPages.currentPage().getParameters().get('FirstName');
        string LastName = ApexPages.currentPage().getParameters().get('LastName');
        string BestTimeToCall = ApexPages.currentPage().getParameters().get('BestTimeToCall');
        string Phone = ApexPages.currentPage().getParameters().get('Phone');
        string Email = ApexPages.currentPage().getParameters().get('Email');
        
        SBQQ__Quote__c q = [select Id, SBQQ__Notes__c, SBQQ__PrimaryContact__c, Name from SBQQ__Quote__c where Name = :qr.QuoteId limit 1];
        q.SBQQ__Notes__c = 
            'First Name: ' + CONVERT.toString(FirstName,'') +
            '\n\rLast Name: ' + CONVERT.toString(LastName,'') +
            '\n\rBest Time To Call: ' + CONVERT.toString(BestTimeToCall,'') +
            '\n\rPhone: ' + CONVERT.toString(Phone,'') +
            '\n\r--------------------------------------------------' + 
            '\n\r' + CONVERT.toString(q.SBQQ__Notes__c,'');
        update q;
        
        Contact c = [select Id from Contact where Id = :q.SBQQ__PrimaryContact__c  limit 1];
        c.FirstName = FirstName;
        c.LastName = LastName;
        c.Mailing_Address_Notes__c = BestTimeToCall;
        c.Campaign__c = 'Quote Requests Consumer';
        c.OrderCampaign_Campaign__c = Quote_Defaults_Settings__c.getInstance().Campaign_Consumer_QuoteRequet_Id__c;
        if (!string.IsBlank(Email)) { c.Email = Email; }
        update c;
        
        try { 
            c.Phone = Phone;
            update c;
        } catch (Exception ex) {}
        
        //CampaignMember cm = new CampaignMember();
        //cm.Status = 'Sent';
        //cm.ContactId = q.SBQQ__PrimaryContact__c;
        //cm.CampaignID = '70146000000ln2UAAQ'; 
        //insert cm;
        
        return JSON.serialize(this.QR);
    }
    
    @future
    public static void SendEmail(
        string email, 
        string quote_name, 
        decimal CC, 
        decimal DD, 
        decimal TT, 
        decimal TD, 
        decimal DT,
        string VehicleName, 
        string origin, 
        string destination, 
        Date pickup_date,
        string contact_id,
        string quote_id,
        string affiliate) {
        try {
            
            Messaging.reserveSingleEmailCapacity(1);
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTargetObjectId(contact_id);
            mail.setWhatId(quote_id);
            mail.setToAddresses( new String[] {email});
            mail.setReplyTo('shipmyride@carsarrive.com');
            mail.setSenderDisplayName('Shipping Quote');
            
            string url = 'https://www.carsrelo.com/images/mailimages/';
            if (SETTING.IsSandbox()) { url = 'https://www.stage.carsrelo.com/images/mailimages/'; }
            
            string html = '<!doctypehtml><meta content="text/html; charset=utf-8"http-equiv=Content-Type><meta content="width=device-width,initial-scale=1"name=viewport><title>CarsArrive Auto Relocation - Auto Shipping Quote</title><link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800,900"rel=stylesheet><style>.ReadMsgBody{width:100%}#outlook a{padding:0}body{width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;font-family:Montserrat,Verdana,sans-serif}.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}#backgroundTable{margin:0;padding:0;width:100%!important;line-height:100%!important}img{outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}a img{border:none}.image_fix{display:block}p{margin:1.5em 0}h1,h2,h3,h4,h5,h6{color:#000!important}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{color:#00f!important}h1 a:active,h2 a:active,h3 a:active,h4 a:active,h5 a:active,h6 a:active{color:red!important}h1 a:visited,h2 a:visited,h3 a:visited,h4 a:visited,h5 a:visited,h6 a:visited{color:purple!important}table td{border-collapse:collapse}table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}a{color:#c6161c;text-decoration-line:none}span.yshortcuts{color:#000;background-color:none;border:none}span.yshortcuts:active,span.yshortcuts:focus,span.yshortcuts:hover{color:#000;background-color:none;border:none}@media only screen and (max-device-width:480px){a[href^=sms],a[href^=tel]{text-decoration:none;color:#c6161c;pointer-events:none;cursor:default}.mobile_link a[href^=sms],.mobile_link a[href^=tel]{text-decoration:default;color:#c6161c!important;pointer-events:auto;cursor:default}}@media only screen and (min-device-width:768px) and (max-device-width:1024px){a[href^=sms],a[href^=tel]{text-decoration:none;color:#c6161c;pointer-events:none;cursor:default}.mobile_link a[href^=sms],.mobile_link a[href^=tel]{text-decoration:default;color:#c6161c!important;pointer-events:auto;cursor:default}}</style><body class=eoa_c1t style=width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;font-family:Montserrat,Verdana,sans-serif><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><p style="margin:1.5em 0"><!--[if IEMobile 7]><style></style><![endif]--><!--[if gte mso 9]><style></style><![endif]--><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;margin:0;padding:0;width:100%!important;line-height:100%!important class=eoa_c1t id=backgroundTable><tr><td style=border-collapse:collapse><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=""><tr><td><tr><td style=border-collapse:collapse width=50><td style=border-collapse:collapse width=250 valign=top align=left><img src=[IMG_URL]CarsArrive_Logo.jpg style=display:block;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=250 valign=top align=right><span class=mobile_link><a href=tel:877.825.4143 style=font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:700;color:#c6161c;text-decoration-line:none>877.825.4143</a></span><td style=border-collapse:collapse width=50></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><img src=[IMG_URL]Group420.jpg style=display:block;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td style=border-collapse:collapse width=70><td style=border-collapse:collapse><p style="margin:1.5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:600;color:#000;margin:0;text-align:center;line-height:20px>Vehicle: [VEHICLE]<p style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:600;color:#000;margin:0;text-align:center;line-height:20px>Origin: [ORIGIN] Destination: [DESTINATION]<p style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:600;color:#000;margin:0;text-align:center;line-height:20px>Quote # [QUOTE_ID]<p style="margin:1.5em 0"><p style="font-family:Montserrat,Verdana,sans-serif;font-size:12px;font-weight:400;color:#3f3f3f;text-align:center;line-height:20px;margin:1.5em 0">Thank you for the opportunity to provide you a quote. If you have questions or would like to set up your shipment, please give us a call at 877.825.4143 to speak with a live counselor. We look forward to earning your business.<p style="margin:1.5em 0"><p style="font-family:Montserrat,Verdana,sans-serif;font-size:12px;font-weight:600;color:#c6161c;margin:0 0 1.5em 0;text-align:center;line-height:20px">CarsRelo offers multiple options to meet your auto relocation needs.<td style=border-collapse:collapse width=85><tr style=height:25px><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><tr><td style=border-collapse:collapse width=20><td style=border-collapse:collapse width=112 valign=top><img src=[IMG_URL]option1-circle-image.jpg style=display:block;padding-top:10px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=18><td style=border-collapse:collapse width=400 align=left><p style=margin:0><span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:700;color:#c6161c;margin:0;text-align:left;line-height:20px>Cruise</span> <span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#000;text-align:center;line-height:20px>- Carrier Direct Service</span><p style="margin:0 0 .5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:400;color:#000;margin:0;text-align:left;line-height:20px>Typically the most cost-effective option when comparing to other carriers. At origin, our carrier will meet you at a nearby parking lot to collect your vehicle within a 3-to 5-day window. At the destination city, the carrier will meet you at a nearby parking lot to release the vehicle. It’s cost effective, but if time is of the essence this may not be the best choice for you.<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr><td style=border-collapse:collapse width=50%><p style="font-family:Montserrat,Verdana,sans-serif;font-size:15px;font-weight:400;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">Best Value<td style=border-collapse:collapse><p style="font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:600;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">[CC]</table><td style=border-collapse:collapse width=50><tr><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><tr><td style=border-collapse:collapse width=20><td style=border-collapse:collapse width=112 valign=top><img src=[IMG_URL]option2-circle-image.jpg style=display:block;padding-top:10px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=18><td style=border-collapse:collapse width=400 align=left><p style=margin:0><span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:700;color:#c6161c;margin:0;text-align:left;line-height:20px>Powertrain</span> <span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#000;text-align:center;line-height:20px>- Service Center to Service Center</span><p style="margin:0 0 .5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:400;color:#000;margin:0;text-align:left;line-height:20px>A balance of cost and convenience. Drop your vehicle at one of our 150+ service centers on the date of your choosing. We will deliver to a destination service center on a date that works for you. This option is a good value choice, but it requires your time commitment to pick up and drop off.<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr><td style=border-collapse:collapse width=50%><p style="font-family:Montserrat,Verdana,sans-serif;font-size:15px;font-weight:400;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">Best Seller<td style=border-collapse:collapse><p style="font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:600;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">[TT]</table><td style=border-collapse:collapse width=50><tr><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><tr><td style=border-collapse:collapse width=20><td style=border-collapse:collapse width=112 valign=top><img src=[IMG_URL]option3-circle-image.jpg style=display:block;padding-top:10px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=18><td style=border-collapse:collapse width=400 align=left><p style=margin:0><span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:700;color:#c6161c;margin:0;text-align:left;line-height:20px>Torque</span> <span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#000;text-align:center;line-height:20px>- Service Center to Door</span><p style="margin:0 0 .5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:400;color:#000;margin:0;text-align:left;line-height:20px>Savings at origin and convenience at destination. Drop off your vehicle at one of our 150+ service centers any date you choose. Final delivery to your driveway or office at destination is completed on a prescheduled appointment date. This option is great if you want more convenience at your destination.<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr><td style=border-collapse:collapse width=50%><p style="font-family:Montserrat,Verdana,sans-serif;font-size:15px;font-weight:400;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">Convenience & Ease<td style=border-collapse:collapse><p style="font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:600;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">[TD]</table><td style=border-collapse:collapse width=50><tr><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><tr><td style=border-collapse:collapse width=20><td style=border-collapse:collapse width=112 valign=top><img src=[IMG_URL]option4-circle-image.jpg style=display:block;padding-top:10px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=18><td style=border-collapse:collapse width=400 align=left><p style=margin:0><span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:700;color:#c6161c;margin:0;text-align:left;line-height:20px>Turbo</span> <span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#000;text-align:center;line-height:20px>- Door to Center Service</span><p style="margin:0 0 .5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:400;color:#000;margin:0;text-align:left;line-height:20px>Your vehicle will be picked up from your driveway or office at origin on your specifically requested date. Once your vehicle arrives at our destination service center you can pick it up at your convenience. This option is great if you need more convenience at your origin.<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr><td style=border-collapse:collapse width=50%><p style="font-family:Montserrat,Verdana,sans-serif;font-size:15px;font-weight:400;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">Convenience & Ease<td style=border-collapse:collapse><p style="font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:600;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">[DT]</table><td style=border-collapse:collapse width=50><tr><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600><tr><td><tr><td style=border-collapse:collapse width=20><td style=border-collapse:collapse width=112 valign=top><img src=[IMG_URL]option5-circle-image.jpg style=display:block;padding-top:10px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic><td style=border-collapse:collapse width=18><td style=border-collapse:collapse width=400 align=left><p style=margin:0><span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:700;color:#c6161c;margin:0;text-align:left;line-height:20px>Supercharger</span> <span style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#000;text-align:center;line-height:20px>- Door-to-Door Service</span><p style="margin:0 0 .5em 0"><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:400;color:#000;margin:0;text-align:left;line-height:20px>The ultimate in convenience…no hassles, complete care. Your vehicle will be picked up from your driveway or office at origin on your specifically requested date. Final destination delivery to your driveway or office is completed during a prescheduled appointment. When convenience is your total priority and you want the best value, this is the ultimate option.<table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr><td style=border-collapse:collapse width=50%><p style="font-family:Montserrat,Verdana,sans-serif;font-size:15px;font-weight:400;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">Full Service<td style=border-collapse:collapse><p style="font-family:Montserrat,Verdana,sans-serif;font-size:18px;font-weight:600;color:#c6161c;text-align:left;line-height:20px;margin:1em 0">[DD]</table><td style=border-collapse:collapse width=50><tr><td></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=600 bgcolor=#3F3F3F><tr style=height:25px><td style=border-collapse:collapse width=40 colspan=5><p><tr><td style=border-collapse:collapse width=40><td style=border-collapse:collapse width=260 valign=top><p style="font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#fff;text-align:left;line-height:24px;margin:0 0 .25em 0">The industry’s most options.<p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:300;color:#fff;text-align:left;line-height:20px;margin:0>Want more of what you’re looking for, look no further. No one offers more options to fit your needs and budget than CarsArrive.<td style=border-collapse:collapse width=40><td style=border-collapse:collapse width=260 valign=top><p style="font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#fff;text-align:left;line-height:24px;margin:0 0 .25em 0">Call us an we’ll take the wheel.<p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:300;color:#fff;text-align:left;line-height:20px;margin:0>Have questions? Call us and we’ll walk you through what option is best for you.<p style=font-family:Montserrat,Verdana,sans-serif;font-size:14px;font-weight:400;color:#fff;text-align:left;line-height:24px;margin:0>877.825.4143<td style=border-collapse:collapse width=40><tr style=height:25px><td style=border-collapse:collapse width=40><p></table><table border=0 cellpadding=0 cellspacing=0 style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0 align=center width=100%><tr style=height:25px><td style=border-collapse:collapse width=40><p><tr><td style=border-collapse:collapse width=30><td style=border-collapse:collapse width=540><p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:600;color:#000;text-align:center;line-height:17px;margin:0>If you believe this has been sent to you in error, please safely <a href=# style=color:#c6161c;text-decoration-line:none><span style=text-decoration:underline;color:#000>unsubscribe</span></a>.<p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:600;color:#000;text-align:center;line-height:17px;margin:0>For more information, please see our <a href=https://www.carsrelo.com/privacy-policy/ style=color:#c6161c;text-decoration-line:none><span style=text-decoration:underline;color:#000>privacy policy</span></a>.<p style=font-family:Montserrat,Verdana,sans-serif;font-size:10px;font-weight:600;color:#000;text-align:center;line-height:17px;margin:0>© 2019 CarsArrive Network. All rights reserved. 1620 South Stapley Drive, Suite 232 • Mesa, Arizona 85204<td style=border-collapse:collapse width=30><tr><td></table></table></table>';
           	html = html.replace('[QUOTE_ID]', quote_name);
            
            if (CC == null) { html = html.replace('[CC]', 'Please contact us');
            } else { html = html.replace('[CC]', '$' + CC.setScale(2).format()); }
            
            if (DD == null) { html = html.replace('[DD]', 'Please contact us');
            } else { html = html.replace('[DD]', '$' + DD.setScale(2).format()); }
            
            if (TT == null) { html = html.replace('[TT]', 'Please contact us');
            } else { html = html.replace('[TT]', '$' + TT.setScale(2).format()); }
            
            if (TD == null) { html = html.replace('[TD]', 'Please contact us');
            } else { html = html.replace('[TD]', '$' + TD.setScale(2).format()); }
            
            if (DT == null) { html = html.replace('[DT]', 'Please contact us');
            } else { html = html.replace('[DT]','$' + DT.setScale(2).format()); }
            
            html = html.replace('[VEHICLE]', VehicleName);
            html = html.replace('[ORIGIN]', origin);
            html = html.replace('[DESTINATION]', destination);
            html = html.replace('[IMG_URL]', url);
            html = html.replace('[PICKUP_DATE]', pickup_date.format());
            html = html.replace('[CREATE_DATE]', Date.today().format());

            mail.setSubject('Your Auto Shipping Quote');
            mail.setHtmlBody(html);
            mail.setBccSender(false);
            mail.setUseSignature(false);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        } catch (Exception ex) { 
            UTIL.Log('RetailRate', ex);
         }
    }
    
    /*
    @future
    public static void SendEmail(
        string email, 
        string quote_name, 
        string advantage, 
        string premium, 
        string vehicle_class, 
        string origin, 
        string destination, 
        Date pickup_date,
        string contact_id,
        string quote_id,
        string affiliate) {
        try {
            Messaging.reserveSingleEmailCapacity(1);
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTargetObjectId(contact_id);
            mail.setWhatId(quote_id);
            mail.setToAddresses( new String[] {email});
            mail.setReplyTo('customerservice@dasautoshippers.com');
            mail.setSenderDisplayName('Shipping Quote');
            
            string html = '<p> <div style=background-color:#dad7d7><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td align=center valign=top><table border=0 cellpadding=0 cellspacing=0 width=600 align=center><tr><td align=center valign=top height=11 class=top_border colspan=3><img height=11 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/holder-top.gif width=599 alt="Please enable images for a better experience."><tr><td align=left valign=top width=3> <td align=center valign=top width=599 bgcolor=#f0f0f0><table border=0 cellpadding=0 cellspacing=0><tr><td align=center><span style=font-size:10px>**** PLEASE DO NOT REPLY TO THIS AUTOMATED MESSAGE ****<br>**** IF YOU HAVE A CUSTOMER SERVICE ISSUE, PLEASE VISIT <a href="http://www.dasautoshippers.com/have-questions?utm_source=custom_quote_email&utm_medium=email&utm_content=TopText_link&utm_campaign=DASemail">CUSTOMER SERVICE</a>****</span></table><td align=left valign=top width=3> <tr><td align=left valign=top width=3> <td align=left valign=top width=599 class=top_links height=8><img height=8 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/top-link_bottom-border.gif width=599 alt=""><td align=left valign=top width=3> <tr bgcolor=#FFFFFF><td align=left valign=top width=3> <td align=left valign=top width=599 class=wht_bkg><blockquote> </blockquote><table border=0 cellpadding=0 cellspacing=0><tr class=wht_bkg><td align=left valign=top><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs//quote/spacer_content.gif width=20 alt=""><td align=left valign=top><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><tr class=wht_bkg><td height=42> <td align=left valign=top width=170 height=42><h1 class=logo><a href=#><img height=87 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/DAS.png width=146 alt="Dependable Auto Shippers"border=0></a></h1><td height=42> <td align=right valign=middle width=364 height=42><img height=24 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/callus.png width=28 align=absbottom> <span style=font-size:25px;vertical-align:middle;color:#747567;font-weight:700>Call toll free</span><br><span style=font-family:Arial,Helvetica,sans-serif;color:#52984f;font-size:34px;font-weight:700;vertical-align:middle>877-315-2824</span><td height=42> </table><table border=0 cellpadding=0 cellspacing=0><tr><td width=599 height=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/header-bottom-border.gif width=599 alt=""></table><td align=left valign=top width=3> <tr bgcolor=#FFFFFF><td align=left valign=top width=3> <td align=left valign=top width=599 class=main_content><table border=0 cellpadding=0 cellspacing=0><tr><td align=left valign=top width=20><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=554><a href=#><img height=269 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/DAS_Truck4.jpg width=554 alt="Dependable Auto Shippers - Driven to Deliver, since 1954"border=0></a><td align=left valign=top width=20><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""></table><table border=0 cellpadding=0 cellspacing=0><tr><td align=left valign=top width=20 class=wht_bkg><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=360 class=wht_bkg> <td align=left valign=top width=20 class=wht_bkg><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=174 class=wht_bkg> <td align=left valign=top width=20 class=wht_bkg><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><tr><td class=wht_bkg> <td align=left valign=top width=360 class=wht_bkg><table border=0 cellpadding=0 cellspacing=0 width=360><tr class=wht_bkg><td class=gry_txt><span style=font-family:Arial,Helvetica,sans-serif;font-size:25px><strong>Trust DAS to relocate</strong></span> your vehicle, and be assured that you\'ll receive excellent customer service every step of the way. Our friendly and helpful Vehicle Shipping Specialists will make sure your vehicle receives the very best treatment, so you can have complete peace of mind. Take the next step and arrange for the industry leader to relocate your vehicle.</table><table border=0 cellpadding=0 cellspacing=0 width=360 class=wht_bkg><tr><td align=right valign=top height=8><img height=8 src=http://www.dasautoshippers.com/images/quote/spacer_content.gif width=1 alt=""><tr><td align=right valign=top><img height=56 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/TallBanner_contact_relocation_specialist.png width=360 alt="Contact Relocation Specialist Today at 877-315-2824!"border=0></table><table border=0 cellpadding=0 cellspacing=0 width=360 class=wht_bkg><tr><td align=right valign=top height=8><img height=8 src=http://www.dasautoshippers.com/images/quote/spacer_content.gif width=1 alt=""><tr><td valign=top class=gry_txt><p>Be sure to keep your reservation/reference number handy for faster service through our automated service center.</table><td class=wht_bkg> <td align=left valign=top width=174 class=wht_bkg><table border=0 cellpadding=0 cellspacing=0 width=174 bgcolor=#e1e1e1><tr><td align=left valign=top width=10 height=11 bgcolor=#FFFFFF><img height=10 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/gray_box-left-top.gif width=10 alt=""><td align=left valign=top width=154> <td align=left valign=top width=10 height=11 bgcolor=#FFFFFF><img height=10 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/gray_box-right-top.gif width=10 alt=""><tr><td align=left valign=top width=10 height=10> <td align=left valign=top width=154><table width=154><tr><td style=font-weight:700;font-size:14px>Reference #:<tr><td style=font-size:14px>[QUOTE_ID]<tr><td style=font-weight:700;font-size:14px>Advantage:<tr><td style=font-size:14px>[ADVANTAGE]<tr><td style=font-weight:700;font-size:14px>Premium:<tr><td style=font-size:14px>[PREMIUM]<tr><td style=font-weight:700;font-size:14px>Vehicle:<tr><td style=font-size:14px>[VEHICLE_CLASS]<tr><td style=font-weight:700;font-size:14px>Origin:<tr><td style=font-size:14px>[ORIGIN]<tr><td style=font-weight:700;font-size:14px>Destination:<tr><td style=font-size:14px>[DESTINATION]<tr><td style=font-weight:700;font-size:14px>Pickup Date:<tr><td style=font-size:14px>[PICKUP_DATE][AFFILIATE]</table><td align=left valign=top width=10 class=sbox_bkg height=10> <tr bgcolor=#e1e1e1><td align=left valign=top width=10 height=11 bgcolor=#FFFFFF><img height=10 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/gray_box-left-bottom.gif width=10 alt=""><td align=left valign=top width=154> <td align=left valign=top width=10 height=11 bgcolor=#FFFFFF><img height=10 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/gray_box-right-bottom.gif width=10 alt=""></table><td class=wht_bkg> <tr class=wht_bkg><td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=360> <td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=174> <td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><tr class=wht_bkg><td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top colspan=3 class="gry_txt sml"><p>Other shipping charges, surcharges, or accessorial fees may apply depending on the unique nature of your shipment. Fuel surcharges may apply above our regular rates. This email was created on [CREATE_DATE].<td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><tr class=wht_bkg><td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=360> <td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=174> <td align=left valign=top width=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""></table><td align=left valign=top width=3> <tr bgcolor=#f0f0f0><td align=left valign=top width=3> <td align=left valign=top width=599 class=footer><table border=0 cellpadding=0 cellspacing=0><tr><td width=599 height=20><img height=20 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/footer-top-border.gif width=599 alt=""></table><table border=0 cellpadding=0 cellspacing=0 bgcolor=#f0f0f0><tr><td align=left valign=top width=20><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=top width=364 style=color:#575757><strong>Dependable Auto Shippers</strong><br>1620 S. Stapley Drive<br>Suite 232<br>Mesa AZ 85204<br><a href="http://www.dasautoshippers.com/?utm_source=custom_quote_email&utm_medium=email&utm_content=BottomText_link&utm_utm_campaign=DASemail">www.dasautoshippers.com</a><td align=left valign=top width=20><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_content.gif width=20 alt=""><td align=left valign=middle width=170> <td align=left valign=top width=20><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=20 alt=""><tr><td align=left valign=bottom width=20 height=12><img height=12 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=20 alt=""><td align=left valign=bottom height=12><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=1 alt=""><td align=left valign=bottom width=20 height=12><img height=12 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=20 alt=""><td align=left valign=bottom height=12><img height=1 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=1 alt=""><td align=left valign=bottom width=20 height=12><img height=12 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/spacer_top-links.gif width=20 alt=""></table><td align=left valign=top width=3> <tr><td align=center valign=top height=11 colspan=3><img height=11 src=http://www.dasautoshippers.com/sites/default/files/imagefield_thumbs/quote/holder-bottom.gif width=599 alt="Please enable images for a better experience."></table></table></div>';
            html = html.replace('[QUOTE_ID]', quote_name);
            html = html.replace('[ADVANTAGE]', advantage);
            html = html.replace('[PREMIUM]', premium);
            html = html.replace('[VEHICLE]', vehicle_class);
            html = html.replace('[ORIGIN]', origin);
            html = html.replace('[DESTINATION]', destination);
            html = html.replace('[IMG_URL]', destination);
            html = html.replace('[PICKUP_DATE]', pickup_date.format());
            html = html.replace('[CREATE_DATE]', Date.today().format());
            html = html.replace('[AFFILIATE]', (string.isNotBlank(affiliate) ? ('<tr><td style=font-weight:700;font-size:14px>Affiliate Code:<tr><td style=font-size:14px>' + affiliate) : ''));
            
            mail.setSubject('Your Auto Shipping Quote');
            mail.setHtmlBody(html);
            mail.setBccSender(false);
            mail.setUseSignature(false);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        } catch (Exception ex) { 
            UTIL.Log('RetailRate', ex);
         }
    } */
    
    private void Log(Exception ex) {
        UTIL.Log('RetailRate', ex);
    }
    
    private void Log(string str) {
        UTIL.Log('RetailRate', str);
    }
    
   public decimal markup_transit = 250;
   public decimal markup_door = 50;
   
   public string VehicleAutoComplete() {
       string veh = '%' + ApexPages.currentPage().getParameters().get('term') + '%';
       Set<Vehicle__c> vehicles = new Set<Vehicle__c>([select Year_Make_Model__c from Vehicle__c where Year_Make_Model__c like :veh order by Year_Make_Model__c desc limit 2000]);
       List<string> rv = new List<string>();
       Integer i = 0;
       for(Vehicle__c v :vehicles) {
        if (!rv.Contains(v.Year_Make_Model__c)) {
             rv.Add(v.Year_Make_Model__c);
             i++;
             if (i > 9) { break; }
        }
       }
       return JSON.serialize(rv);
   }
   
   public class QuoteResponse {
        public string QuoteId {get; set;}
        public decimal Advantage {get; set;}
        public decimal Standard {get; set;}
        public decimal Premium {get; set;}
        public decimal DD {get; set;}
        public decimal TT {get; set;}
        public decimal TD {get; set;}
        public decimal DT {get; set;}
        public decimal CC {get; set;}
        public boolean Quoteable {get; set;}
        public string Error {get; set;}
    }
    
    public static string SERVICE_TYPE_DestinationDirect = 'Destination Direct';
    public static string SERVICE_TYPE_TerminalService = 'Terminal Service';
    public static string SERVICE_TYPE_CarrierDirect = 'Carrier Direct';
    public static string SERVICE_TYPE_OriginDirect = 'Origin Direct';
    
    
}
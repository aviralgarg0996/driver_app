 var len = this.props.state.pickupArr.length;
        var pickup = [];
        var drop = [];
        this.props.state.Hourly_pickupArr.map((val, i) => {
            if (i < len - 1) {
                pickup[i] = {
                    "pickup_point": val.lat + ',' + val.long,
                    "address": val.address,
                    "pickup_status": 0,
                    "arrive_status": 0,
                    "priority": 0,
                    type: 'pickup'
                }
            }
        });

        var len = this.props.state.Hourly_dropArr.length;
        this.props.state.Hourly_dropArr.map((val, i) => {
            if (i < len - 1) {
                drop[i] = {
                    "drop_point": val.lat + ',' + val.long,
                    "address": val.address,
                    "drop_status": 0,
                    "priority": 0,
                    type: 'drop'
                }
            }
        });
        var duration = this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours', '').replace(' hour', '');
        AsyncStorage.getItem("id").then((value) => {
            console.log("all datas", JSON.stringify({
                "date": this.props.state.HourlyServiceDisplayDate,
                "time": this.props.state.HourlyServiceDisplayTime,
                "quantity": [3, 2],
                "id": value,
                "service_type": 2,
                "pickup": pickup,
                "drop_location": drop
            }));
            fetch(CustomerConnection.getTempUrl()+'place-order/vehiclecalculation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "pickup": pickup,
                    "drop_location": drop,
                    "date": this.props.state.HourlyServiceDisplayDate,
                    "time": this.props.state.HourlyServiceDisplayTime,
                    "quantity": [3, 2],
                    "id": value,
                    "service_type": 2,
                }),
            }).then((response) => response.json())
                .then((arr) => {
                    this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr.data });
                    this.props.dispatch({ type: 'SET_HOURLYSERVICE_TABINDEX', index: 1 });
                    showFlat = true
                })
                .catch((error) => {
                    console.error(error);
                });

            // API CALL END
        }
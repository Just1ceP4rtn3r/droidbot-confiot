from replay import *

# capture alert
# input: configuration list
# output: can or can not do configuration

def check_guest_conf_succeed():
    # if (guest sleep 1 not succeed & guest sleep 2 not succeed) or (guest sleep 1 succeed & guest sleep 2 succeed)
    # if (guest sleep 1 not succeed & guest sleep 2 succeed) permission increase
    # if (guest sleep 1 succeed & guest sleep 2 not succeed) permission reduce
    pass

def init_confiot(confiot_object, device_id, output_path, droidbot_result_path):
    confiot_object = Confiot()
    confiot_object.device_connect(device_id, output_path)
    confiot_object.parse_event(droidbot_result_path)
    confiot_object.device_stop_app()
    confiot_object.device.start_app(confiot_object.app)
    # waiting for app start
    time.sleep(5)
    print("Launch app succeed on %s\n" % device_id)

def host_and_guest():
    confiot_host = Confiot()
    host_device_id = "35e38c40"
    host_output_path = "/Users/tracy/Documents/github/droidbot/Confiot/host"
    host_droidbot_result_path = "/Users/tracy/Documents/github/droidbot/mihome/oneplus"
    init_confiot(confiot_host, host_device_id, host_output_path, host_droidbot_result_path)

    confiot_guest = Confiot()
    guest_device_id = "17291JECB10652"
    guest_output_path = "/Users/tracy/Documents/github/droidbot/Confiot/guest"
    guest_droidbot_result_path = "/Users/tracy/Documents/github/droidbot/mihome/pixel5"
    init_confiot(confiot_guest, guest_device_id, guest_output_path, guest_droidbot_result_path)

    # host (share device) : guest permission (control->view) 
    # to state
    confiot_host.parse_utg(host_droidbot_result_path)
    confiot_host.device_to_state("f30e87a70c183f7c2776c5bc53b34c51")
    # do event
    # host_event_str_delete = "TouchEvent(state=4a97b3fe4bd1508fef22220bcd2bb82e, view=a96deaf904c03fea6c3feb24d1877fb0(ShareDeviceDetail/Button-OK))"


    host_event_str_share = "TouchEvent(state=f30e87a70c183f7c2776c5bc53b34c51, view=16183e85f5f432a322d8d1302a861823(ShareDeviceInfoActivity/RelativeLayout-))"
    host_event_str_share_device = "TouchEvent(state=439f860d6f6c07e06719e2f4b16bcc20, view=00ec4fab9b3bfdb9271bd7522bf7b24b(ShareDeviceDetail/TextView-Share devi))"
    host_event_str_share_device_to_guest = "TouchEvent(state=a5cc872c94cf25fef75485195c2af54d, view=216193f28fc6b0f9a8dde1929e070c95(ShareDeviceActivity/TextView-6671292141))"
    host_event_str_share_device_view_only = "TouchEvent(state=9f8ff13ee391ceb9a4cc8adf7de6d404, view=35553d51e83a9e169609703634423522(ShareDeviceActivity/TextView-View only))"
    host_event_str_share_device_next = "TouchEvent(state=a5cc872c94cf25fef75485195c2af54d, view=216193f28fc6b0f9a8dde1929e070c95(ShareDeviceActivity/TextView-6671292141))"
    host_event_str_share_device_ok = "TouchEvent(state=736724bc483ccb73aa89e1987ec106d3, view=fb694c12e86a4fecd92233ee1d8d4f58(ShareActivity/TextView-OK))"

    confiot_host.do_event(host_event_str_share)
    time.sleep(1)
    confiot_host.do_event(host_event_str_share_device)
    time.sleep(1)
    confiot_host.do_event(host_event_str_share_device_to_guest)
    time.sleep(1)
    confiot_host.do_event(host_event_str_share_device_view_only)
    time.sleep(1)
    confiot_host.do_event(host_event_str_share_device_next)
    time.sleep(1)
    confiot_host.do_event(host_event_str_share_device_ok)
    time.sleep(1)

    # guest: sleep 2
    guest_event_str_1 = "TouchEvent(state=fa07fbc0617b10f4d31d1cbcf5c8ce05, view=23f3da97dc88c7a191d58cd9c305d396(SmartHomeMainActivity}/ViewGroup-))"
    guest_event_str_2 = "TouchEvent(state=8f9faca9459fa27a8a33eb1a9da4cc07, view=e26dde88a959dcc2ab4d2f04eb1fb85a(PluginRNActivityCamera}/ImageView-))"

    confiot_guest.do_event(guest_event_str_1)
    time.sleep(1)
    # do twice
    confiot_guest.do_event(guest_event_str_2)
    time.sleep(1)
    confiot_guest.do_event(guest_event_str_2)
    time.sleep(1)

host_and_guest()













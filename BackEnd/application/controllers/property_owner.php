<?php

class Property_Owner extends CI_Controller {
        
    public function __construct() {
        parent::__construct();
		$this->load->model('property_owner_model');
		$this->load->model('manage_file_model');
    }
    
    public function get_Property_Owner() {
        echo json_encode($this->property_owner_model->get());
        die();
    } 
    
    public function insert_Property_Owner () {
		$responce = isset($_FILES['profile_picture']) ? $this->manage_file_model->saveFile($_FILES['profile_picture']) : null;
		if($responce == null || $responce['status']){
			$_POST['profile_picture'] = $responce == null ? null : $responce['file_path'];
			if($this->property_owner_model->insert($_POST)){
				echo true;
				die();
			}
			// delete profile_picture
			echo false;
			die();
		} 
		echo false;
		die();
	}
    
    public function search_Property_Owner() {
        // echo json_encode($this->Super_Repository->search(['property_owner_id' => 10, 'ownerName' => 'ownerName4']));
        echo json_encode($this->property_owner_model->search($_GET));
    }

    public function update_Property_Owner() {
        // echo $this->property_owner_model->update(['property_owner_id' => 0, 'property_owner_name' => 'property_owner_name14', 'address_postal_code' => 'address_postal_code14', 'address_street_and_num' => 'address_street_and_num14', 'address_city' => 'address_city14', 'address_country' => 'address_country14', 'fax' => 'fax14', 'email' => 'email14', 'registerd_date' => '2017.1.14', 'profile_picture' => 'profile_picture14', 'username' => 'username14', 'password' => 'password14'], ['property_owner_id' => 14]) > 0? true : false;
        echo $this->property_owner_model->update($_POST, ['property_owner_id' => $_POST['property_owner_id']]) > 0? true : false;        
    }
    
    public function delete_Property_Owner() {
        // echo json_encode($this->property_owner_model->search($_GET));
        // echo $this->property_owner_model->delete(['property_owner_id' => 10]) > 0? true : false;
        echo $this->property_owner_model->delete($_GET);
        // print_r($_GET);
    }

}
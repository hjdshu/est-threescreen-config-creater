SiiNunit
{
multimon_config : _nameless.17a.367f.c160 {
 normalized_ui_x: 0.5
 normalized_ui_width: 0.5
 monitors: 2
 monitors[0]: _nameless.17a.3677.3a70
 monitors[1]: _nameless.17a.3677.3ef0
}

monitor_config : _nameless.17a.3677.3a70 {
 name: center
 normalized_x: 0.5
 normalized_y: 0.000000
 normalized_width: 0.5
 normalized_height: 1.000000
 horizontal_fov_relative_offset: 0.000000
 vertical_fov_relative_offset: 0.000000
 heading_offset: 0.000000
 pitch_offset: 0.000000
 roll_offset: 0.000000
 camera_space_offset: (0.000000, 0.000000, 0.000000)
 horizontal_fov_override: {{center.horizontal_fov_override}}
 vertical_fov_override: 0.000000
 frustum_subrect_x: 0.000000
 frustum_subrect_y: 0.000000
 frustum_subrect_width: 1.000000
 frustum_subrect_height: 1.000000
 render_interior: true
 render_exterior: true
}

monitor_config : _nameless.17a.3677.3ef0 {
 name: left
 normalized_x: 0
 normalized_y: 0.000000
 normalized_width: 0.5
 normalized_height: 1.000000
 horizontal_fov_relative_offset: {{left.horizontal_fov_relative_offset}}
 vertical_fov_relative_offset: 0.000000
 heading_offset: {{left.heading_offset}}
 pitch_offset: 0.000000
 roll_offset: 0.000000
 camera_space_offset: (0.000000, 0.000000, 0.000000)
 horizontal_fov_override: {{left.horizontal_fov_override}}
 vertical_fov_override: {{left.vertical_fov_override}}
 frustum_subrect_x: 0.000000
 frustum_subrect_y: 0.000000
 frustum_subrect_width: {{left.frustum_subrect_width}}
 frustum_subrect_height: 1.000000
 render_interior: true
 render_exterior: true
}

}

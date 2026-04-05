precision mediump float;
in vec2 UV;

const float march_limit = 30.0;
const float distance_min = 0.01;
const int march_iterations = 150;
const float epsilon = 0.01;

uniform float time;
uniform float light_ambient;
uniform float light_intensity;
uniform vec3 camera_position;
uniform vec3 ambient_color;
uniform float aspect_ratio;
uniform vec3 light_position;
uniform vec2 mouse;

// Non-periodic sinusoidal noise
float noise(vec3 p) {
    return sin(2.0 * p.x) * sin(3.14 * p.x) + sin(2.0 * p.y) * sin(3.14 * p.y) + sin(2.0 * p.z) * sin(3.14 * p.z);
}

float heightField(vec3 position){
    return noise(vec3(position.x,0.0,position.z));
}

float SDF(vec3 position){
    return position.y - heightField(position * 0.4 + time) * 0.15;
}

// Get approximated normal
vec3 getNormal(vec3 p) {
    vec2 e = vec2(epsilon, 0.0);
    return normalize(vec3(
        SDF(p + e.xyy) - SDF(p - e.xyy),
        SDF(p + e.yxy) - SDF(p - e.yxy),
        SDF(p + e.yyx) - SDF(p - e.yyx)
    ));
}

float rayMarch(vec3 ray_origin, vec3 ray_direction) {
    float t = 0.0;
    for (int i = 0; i < march_iterations; i++) {
        vec3 position = ray_origin + ray_direction * t;
        float distance = SDF(position);
        if (distance < distance_min) return t;
        t += clamp(distance, 0.01, 1.0);
        if (t > march_limit) break;
    }

    return -1.0;
}

void main(){
    vec2 uv = UV * 2.0 - 1.0;
    uv.x *= aspect_ratio;

    vec4 color = vec4(ambient_color,1.0);
    vec3 ray_origin = camera_position;
    vec3 ray_direction = normalize(vec3(uv,1.0));

    float t = rayMarch(ray_origin, ray_direction);
    if(t > 0.0){
        vec3 pos = ray_origin + ray_direction * t;
        float dist = SDF(pos);
        vec3 normal = getNormal(pos);

        // Add a point light
        vec3 L = light_position - pos;
        float distToLight = length(L);
        vec3 lightDir = normalize(L);
        float diff = max(dot(normal, lightDir), 0.0);
        float attenuation = 1.0 / (1.0 + distToLight * distToLight);

        float pointLight = diff * attenuation * light_intensity + light_ambient;
        
        // Fog to fade out further distances
        float fog = 1.0 - exp(-t * 0.25);

        // Mix result
        vec3 base_color = vec3(0.0, UV.x, UV.y * 1.5);
        vec3 finalColor = max(base_color * pointLight, ambient_color);
        color = vec4(mix(finalColor, ambient_color, fog), 1.0);
    }

    gl_FragColor = color;
}